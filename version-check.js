/**
 * @fileoverview This file compares the current commit SHA against the one
 * of the deployed site. If they are different then another Cloud Build task
 * is kicked off ('deploy.yml').
 */

// Importing required modules
const {default: fetch} = require('node-fetch');
const {ErrorReporting} = require('@google-cloud/error-reporting');
const getVersion = require('./tools/version');
const {CloudBuildClient} = require('@google-cloud/cloudbuild');

// Initializing ErrorReporting and CloudBuildClient
const errors = new ErrorReporting();
const client = new CloudBuildClient();

// Setting up constants
const ERROR_MESSAGE = 'NOT FOUND';
const deployTriggerId = 'eefc1e51-0e94-48e1-a1be-76da08f9a0b6';

/**
 * @returns {Promise<string>} Returns the deployed version as a string.
 */
const getDeployedVersion = () => {
  // Fetching the deployed version from the URL
  return fetch('https://developer.chrome.com/site-version')
    .then(res => (res.ok ? res.text() : ERROR_MESSAGE))
    .catch(() => ERROR_MESSAGE);
};

(async () => {
  // Getting the current and deployed versions
  const deployedVersion = await getDeployedVersion();
  const currentVersion = getVersion();

  // Logging the current and deployed versions
  console.log(`Current version: ${currentVersion}`);
  console.log(`Deployed version: ${deployedVersion}`);

  // Checking if the deployed version is not found
  if (deployedVersion === ERROR_MESSAGE) {
    errors.report('Deployed commit SHA not found');
  }

  // Comparing the current and deployed versions
  if (deployedVersion === currentVersion) {
    console.log(
      'The current and deployed versions are the same, not continuing build.'
    );
    return;
  }

  // Comparing the current and deployed versions and kicking off deploy build
  console.log(
    'The current and deployed versions are different, kicking off deploy build.'
  );

  // Checking if there are any existing builds
  const ret = client.listBuildsAsync({
    projectId: process.env.PROJECT_ID,
    pageSize: 1,
    filter: `trigger_id="${deployTriggerId}" AND (status="WORKING" OR status="QUEUED")`,
  });

  let activeBuild = false;

  // If there is an active or queued build, not starting another
  for await (const _build of ret) {
    activeBuild = true;
    break;
  }
  if (activeBuild) {
    console.log(
      'There is a current active or queued build. Not starting another.'
    );
    return;
  }

  // Running the build trigger
  try {
    await client.runBuildTrigger({
      projectId: process.env.PROJECT_ID,
      triggerId: deployTriggerId,
    });
  } catch (e) {
    errors.report(e);
  }
})();

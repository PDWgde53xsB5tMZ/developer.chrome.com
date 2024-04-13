// Import required functions from their respective modules.
const {announceDeploymentStart} = require('./announceDeploymentStart');
const {determineDeploymentType} = require('./determineDeploymentType');
const {buildStaticSite} = require('./buildStaticSite');
const {announceDeploymentFinished} = require('./announceDeploymentFinished');
const {cleanUpGoogleCloud} = require('./cleanUpGoogleCloud');

// Export all required functions as an object, making them available for use in other modules.
module.exports = {
  // announceDeploymentStart: This function announces the start of a deployment.
  announceDeploymentStart,
  
  // determineDeploymentType: This function determines the type of deployment.
  determineDeploymentType,
  
  // buildStaticSite: This function builds the static site.
  buildStaticSite,
  
  // announceDeploymentFinished: This function announces the finish of a deployment.
  announceDeploymentFinished,
  
  // cleanUpGoogleCloud: This function cleans up any remaining resources on Google Cloud.
  cleanUpGoogleCloud,
};

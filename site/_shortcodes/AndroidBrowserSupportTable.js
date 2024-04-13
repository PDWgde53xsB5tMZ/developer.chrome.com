// Copyright information and license details

const {html} = require('common-tags');

/**
 * Generates an HTML table comparing Android Browser features across different browsers.
 *
 * @param {string} _method - The method being referenced in the table.
 * @param {string} chrome - Configuration data for Chrome.
 * @param {string} edge - Configuration data for Microsoft Edge.
 * @param {string} firefox - Configuration data for Firefox.
 * @param {string} opera - Configuration data for Opera.
 * @param {string} samsung - Configuration data for Samsung Internet.
 * @param {string} brave - Configuration data for Brave.
 * @param {string} tor - Configuration data for Tor Browser.
 * @param {string} uc - Configuration data for UC.
 * @return {string} - The generated HTML table.
 */

// Object containing browser names and their corresponding links on the Google Play Store.
const BROWSERS = {
  chrome: {
    name: 'Chrome',
    link: 'https://play.google.com/store/apps/details?id=com.android.chrome',
  },
  // Other browser configurations...
};

// Object containing compatibility values and their corresponding labels and display characters.
const COMPAT = {
  y: {
    short: 'yes',
    label: 'Supported',
    display: '✓',
  },
  n: {
    short: 'no',
    label: 'Unsupported',
    display: '✗',
  },
  ct_unimplemented: {
    short: 'na',
    label: 'CustomTabs Unimplemented',
    display: '—',
  },
};

/**
 * Generates the HTML table for Android Browser feature comparison.
 *
 * @param {Object} args - An object containing browser names as keys and their corresponding
 *                        support notes as values.
 * @return {string} - The generated HTML table.
 */
const AndroidBrowserSupportTable = args => {
  // Extract the _method and browser support data from the input arguments.
  const {_method} = args;
  const browsers = Object.entries(args).filter(a => !a[0].startsWith('_'));

  // Generate table headings with browser names and links.
  const headings = browsers
    .map(b => {
      const [browser] = b;
      const {name, link} = BROWSERS[browser];

      return html`<th title="${name}" data-browser="${browser}">
        <a href="${link}" rel="nofollow">${name}</a>
      </th>`;
    })
    .join('');

  // Generate table body rows with browser support information.
  const body = browsers
    .map(b => {
      const [browser, supportNote] = b;
      const [support, version] = supportNote.split('@');
      const {name} = BROWSERS[browser];
      const compatValue = COMPAT[support]?.short || 'bug';
      const label = COMPAT[support]?.label || support;
      const displayValue = COMPAT[support]?.display || COMPAT.y.display;
      let hoverTitle = '';

      if (compatValue === 'na') {
        hoverTitle = 'CustomTabs are not supported in general';
      } else {
        hoverTitle = `${_method} ${
          compatValue === 'yes' ? 'Supported' : 'Unsupported'
        }`;
      }

      hoverTitle = `${hoverTitle} as of ${name} version ${version}`;

      return html`<td
        data-browser="${browser}"
        data-compat="${compatValue}"
        aria-label="${label}"
      >
        <span title="${hoverTitle}"> ${displayValue} </span>
      </td>`;
    })
    .join('');

  // Return the generated HTML table.
  return html`<table>
    <thead>
      <tr>
        ${headings}
      </tr>
    </thead>
    <tbody>
      <tr>
        ${body}
      </tr>
    </tbody>
  </table> `;
};

// Export the AndroidBrowserSupportTable function for use in other modules.
module.exports = {AndroidBrowserSupportTable};

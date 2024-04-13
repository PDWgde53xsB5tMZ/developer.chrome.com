// Copyright information and license details.

const {html} = require('common-tags');
const {IFrame} = require('./IFrame');

/**
 * Converts `allow` sources to an array and lowercases them. If `allow` sources
 * are a string, it will split it by the `;` character.
 *
 * @param {string|string[]} s - The `allow` sources.
 * @returns {string[]} The converted `allow` sources.
 */
function expandAllowSource(s) {
  if (typeof s === 'string') {
    s = s.split(/;\s*/g);
  }
  return s.map(a => a.toLowerCase());
}

/**
 * Generates HTML for a Glitch embed as a string.
 *
 * @param {GlitchArgs} args - Named arguments.
 * @return {string} The generated HTML.
 */
const Glitch = args => {
  const defaultAllow = [
    'camera',
    'clipboard-read',
    'clipboard-write',
    'encrypted-media',
    'geolocation',
    'microphone',
    'midi',
  ];

  /** @type GlitchProps */
  const glitchProps = {
    allow: [],
    height: 420,
    path: '',
    previewSize: 100,
    ...args,
  };

  // Validation to ensure an `id` is provided.
  if (!glitchProps.id) {
    throw new Error('No `id` provided to Glitch shortcode.');
  }

  // Creating the URL for the Glitch embed.
  const url = new URL(`https://glitch.com/embed/#!/embed/${glitchProps.id}`);
  const searchParams = new URLSearchParams();
  searchParams.set('attributionHidden', 'true');
  searchParams.set('sidebarCollapsed', 'true');

  // Adding the `path` and `previewSize` to the URL search parameters.
  if (glitchProps.path) {
    searchParams.set('path', glitchProps.path);
  }
  if (typeof glitchProps.previewSize === 'number') {
    searchParams.set('previewSize', String(glitchProps.previewSize));
  }

  // Combining the default and provided `allow` sources.
  const allow = Array.from(
    new Set([...defaultAllow, ...expandAllowSource(glitchProps.allow)])
  ).join('; ');

  // Returning the generated HTML for the Glitch embed.
  return html`
    <div
      class="glitch-embed-wrap"
      style="height: ${glitchProps.height}px; width: 100%;"
    >
      ${IFrame({
        src: `${url.toString()}?${searchParams.toString()}`,
        title: `${glitchProps.id} on Glitch`,
        allow,
      })}
    </div>
  `.replace(/\s\s+/g, ' ');
};

// Exporting the `Glitch` function.
module.exports = {Glitch};

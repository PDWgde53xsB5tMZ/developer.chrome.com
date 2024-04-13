// Import the 'striptags' module to remove HTML tags and newlines
const striptags = require('striptags');

/**
 * Strips HTML tags and newlines for use as a meta attribute.
 *
 * @param {string|undefined} raw - The raw HTML string to be stripped.
 * @return {string} - The stripped string.
 */
function stripForMeta(raw) {
  // If 'raw' is not provided, return an empty string
  if (!raw) {
    return '';
  }
  let work = striptags(raw);
  // Replace all newline characters with a space
  work = work.replace(/\n/g, ' ');
  // Replace all sequences of one or more whitespace characters with a single space
  work = work.replace(/\s+/g, ' ');
  return work;
}

/**
 * Finds the RenderNamespace for the specified API.
 *
 * @param {{api: string, chromeApiNamespaces: {[name: string]: any}}} data - An object containing the API name and an object of chrome API namespaces.
 * @return {any=} - The RenderNamespace object or undefined if the API is not provided.
 */
function namespaceForData(data) {
  const { api, chromeApiNamespaces } = data;
  if (!api) {
    return undefined;
  }

  // This function can be called several times by Eleventy due to the odd order of data resolution.
  // It's fine to return undefined here, and we don't want to log (since it'll be spammy), and
  // we'll be called again if we previously returned undefined.
  return chromeApiNamespaces[api];
}

// Export an object containing computed properties for Eleventy
module.exports = {
  eleventyComputed: {
    // Compute the RenderNamespace for the data object
    namespace: data => {
      return namespaceForData(data);
    },

    /**
     * Finds all permissions, both specified in the .d.ts and any additional permissions
     * specified here inside the front matter.
     *
     * @return {string[]} - An array of permission strings.
     */
    permissions: data => {
      const extraPermissions = data.extra_permissions ?? [];
      const namespacePermissions = data.namespace?.permissions ?? [];

      // Combine and remove duplicates from the permission arrays
      const all = new Set([...extraPermissions, ...namespacePermissions]);
      const out = [...all];
      out.sort();
      return out;
    },

    /**
     * @return {string} - The layout string.
     */
    layout: data => {
      if (data.layout) {
        return data.layout; // don't clobber existing values
      }

      // If the data object has an API, use a predefined layout
      if (data.api) {
        return 'layouts/namespace-reference.njk';
      }

      // Every item in this folder should either be displaying an API (and have `data.api` set) or
      // have a specific layout override, so throw otherwise.
      throw new Error(`API reference page has no data.layout: ${data.layout}`);
    },

    /**
     * @return {string} - The title string.
     */
    title: data => {
      const namespace = namespaceForData(data);
      if (data.title) {
        return data.title;
      }
      return namespace?.name ?? '?';
    },

    /**
     * @return {string} - The description string.
     */
    description: data => {
      if (!data.api || data.description) {
        return data.description;
      }
      const namespace = namespaceForData(data);
      return stripForMeta(namespace?.description);
    },
  },
};


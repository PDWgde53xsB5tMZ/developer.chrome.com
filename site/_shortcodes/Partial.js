/**
 * Returns the rendered content of a page living in the partials collection
 * @param {string} partialPath Partial path
 */
async function Partial(partialPath) {`


const locale = this.ctx.locale || defaultLocale;


partialPath = path.join('/', basePath, partialPath);
partialPath = partialPath.replace(/(index)?.(md|njk|html)$/, '');


const partial = findByFilePath(
    // @ts-ignore: `this` has type of `any`
    this.ctx.collections.partials,
    partialPath,
    locale
  );
if (!partial) {
    console.warn(`No partial found at ${partialPath}`);
    return '';
  }


const template = partial.template;
template.wrapWithLayouts = false;

// @ts-ignore: `this` has type of `any`
const templateContent = await template.render(this.ctx);
return templateContent;

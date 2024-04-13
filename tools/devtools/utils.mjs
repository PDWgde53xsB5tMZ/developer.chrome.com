import {readFile, writeFile, mkdir} from 'fs/promises';
import nunjucks from 'nunjucks';
import {Octokit} from 'octokit';
import {dirname} from 'path';

nunjucks.configure({
  autoescape: false,
  tags: {blockStart: '<%', blockEnd: '%>'},
});

// The `blogTemplate` and `bannerTemplate` constants hold the file paths for
// the Nunjucks templates used to generate the blog post and banner for
// "What's New in DevTools" posts.
const blogTemplate = './tools/devtools/templates/new-in-devtools.md';
const bannerTemplate = './tools/devtools/templates/new-in-devtools-banner.svg';

// The `blogDest`, `outlineDest`, and `bannerDest` constants are used to
// render the file paths for the generated files. They include placeholders
// for the language and version, which will be replaced when generating files
// for multiple languages and versions.
const blogDest = './site/{{lang}}/blog/new-in-devtools-{{version}}/index.md';
const outlineDest = './site/{{lang}}/_partials/devtools/whats-new.md';
const bannerDest = './tools/devtools/_temp/new-in-devtools-banner-{{lang}}.svg';

// The `blogPostData` object contains data used for generating the blog posts.
// It includes an array of locales and a `translation` object with translations
// for different languages.
export const locales = [
  {lang: 'en', isDefault: true},
  {lang: 'es'},
  {lang: 'ja'},
  {lang: 'pt'},
  {lang: 'ru'},
  {lang: 'zh'},
];

const translation = {
  language: {
    es: 'Spanish',
    ja: 'Japanese',
    ko: 'Korean',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
  },
  title: {
    en: "What's New in DevTools (Chrome {{version}})",
    es: 'Qué hay de nuevo en DevTools (Chrome {{version}})',
    ja: 'DevTools の新機能 (Chrome {{version}})',
    ko: 'DevTools 의 새로운 기능 (Chrome {{version}})',
    pt: 'O que há de novo no DevTools (Chrome {{version}})',
    ru: 'Новинки DevTools (Chrome {{version}})',
    zh: 'DevTools 新功能（Chrome {{version}}）',
  },
  thankful: {
    es: '*Gracias por la traducción [Miguel Ángel](https://midu.dev) y por la revisión [Carlos Caballero](https://carloscaballero.io).*',
    ja: '*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*',
    ko: '*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하셨으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*',
    pt: '*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*',
    ru: '*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*',
    zh: '*感谢 [Poong Zui Yong](https://www.linkedin.com/in/zui-yong-poong-1b507b14/) 提供的翻译*',
  },
  reviewers: {
    es: ['midudev', 'Caballerog', 'and-oli'],
    ja: ['yoshiko-pg', 'lacolaco', 'technohippy', 'yoichiro'],
    ko: ['syang0624', 'TORU0239', 'cwdoh'],
    pt: ['alvarocamillont', 'khaosdoctor'],
    ru: ['solarrust', 'webmaxru', 'kateryna-prokopenko'],
    zh: ['xyugroup', 'aquaMAX', 'liuliangsir', 'louisyoong', 'hanselfmu'],
  },
  banner: {
    en: "What's new in",
    es: 'Qué hay de nuevo en',
    ja: '新機能',
    ko: '새로운 기능',
    pt: 'O que há de novo no',
    ru: 'Новинки',
    zh: '新功能',
  },
};

/**
 * Get Today's date in ISO 8601
 * @returns YYYY-MM-DD
 */
function getToday() {
  // The `getToday` function returns the current date in the ISO 8601 format
  // (YYYY-MM-DD) using the Intl.DateTimeFormat object.
  return new Intl.DateTime

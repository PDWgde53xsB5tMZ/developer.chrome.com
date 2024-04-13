// Importing required modules
const test = require('ava'); // Testing framework for Node.js
const cheerio = require('cheerio'); // Server-side implementation of jQuery
const {html} = require('common-tags'); // Template literal tag for generating HTML

// Importing Img shortcode from the specified path
const {Img} = require('../../../site/_shortcodes/Img');

// Binding thisToBind object to Img shortcode
const thisToBind = {page: {inputPath: './this/file/doesnt/exist.md'}};

// Test case 1: Img shortcode generates img html
test('Img shortcode generates img html', t => {
  const src = 'image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg';

  // Binding thisToBind object to Img shortcode and generating img html
  const parsed = cheerio.load(Img.bind(thisToBind)({src, alt: 'hello', height: '100', width: '100'}));

  // Defining expected img html using template literal tag
  const expected = cheerio.load(html` <img
    src="https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format"
    srcset="
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=100   100w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=140   140w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=196   196w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=274   274w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=384   384w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=538   538w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=752   752w,
      https://wd.imgix.net/image/foR0vJZKULb5

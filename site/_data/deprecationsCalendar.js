// Importing required modules: path, fs, and yaml for handling file paths, reading and writing files, and parsing YAML data
const path = require('path');
const fs = require('fs').promises;
const yaml = require('js-yaml');

// Defining the file paths for the deprecations data and related articles
const RELATED_ARTICLES_PATH = path.join(
  __dirname,
  './deprecations-calendar/deprecations-articles.yml'
);
const DEPRECATIONS_FILE_PATH = path.join(
  __dirname,
  '../../external/data/chrome-deprecations.json'
);

/**
 * Pulls a list of deprecation items
 *
 * This asynchronous function reads the deprecations data from the chrome-deprecations.json file and returns a promise that resolves in an array containing all the deprecations
 *
 * @return {promise} A promise that resolves in an array containing all the deprecations
 */
async function getDeprecationData() {
  let deprecations;

  try {
    // Reading the deprecations data from the chrome-deprecations.json file
    deprecations = JSON.parse(
      await fs.readFile(DEPRECATIONS_FILE_PATH, 'utf-8')
    );
  } catch (error) {
    console.error('Error reading Deprecations file', error);
  }

  return deprecations;
}

/**
 * Pulls articles related to deprecations from the deprecation-articles.yml file
 *
 * This asynchronous function reads the related articles data from the deprecation-articles.yml file and returns a promise that resolves in an array containing all the articles
 *
 * @return {promise} A promise that resolves in an array containing all the articles
 */
async function getArticles() {
  let articles;

  try {
    // Reading the related articles data from the deprecation-articles.yml file
    const articlesYaml = await fs.readFile(RELATED_ARTICLES_PATH, 'utf-8');
    const articlesData = yaml.load(articlesYaml);
    if (articlesData) articles = articlesData;
  } catch (error) {
    console.error('Error reading YAML file', error);
  }

  return articles;
}

/**
 * Adds the articles to the correct deprecation
 *
 * This function takes in an array of deprecations and an array of articles, and adds the articles to the correct deprecation by matching the deprecation id with the article id
 *
 * @param {object[]} deprecations
 * @param {object[]} articles
 * @return {object[]} An array of deprecations with their related articles
 */
function addArticles(deprecations, articles) {
  for (const deprecation of deprecations) {
    const linkedArticle = articles[deprecation.id];
    if (linkedArticle) {
      // Adding the related article to the deprecation
      deprecation.article = linkedArticle.

// This is a copyright notice for the code, indicating that it is owned by Google LLC.
// It also includes a license notice for the Apache License, Version 2.0,
// which specifies the terms under which the code can be used.

const {isGAEProd} = require('./env');
// isGAEProd is a function that checks if the application is running in Google
// App Engine production environment. It is imported from the 'env' module.

const express = require('express');
// Express is a web application framework for Node.js. It is imported and
// assigned to the 'express' constant.

const compression = require('compression');
// Compression is a middleware for Express that compresses the response data
// to save bandwidth. It is imported and assigned to the 'compression' constant.

const {renderHandler} = require('./render');
// renderHandler is a function that handles the rendering of views. It is
// imported from the 'render' module and assigned to the 'renderHandler' constant.

const {notFoundHandler} = require('./not-found');
// notFoundHandler is a function that handles 404 Not Found errors. It is
// imported from the 'not-found' module and assigned to the 'notFoundHandler' constant.

const {buildStaticHandler} = require('./handlers/static');
// buildStaticHandler is a function that builds a handler for serving static files.
// It is imported from the 'static' module in the 'handlers' directory and
// assigned to the 'buildStaticHandler' constant.

const unknownDomainRedirectHandler = require('./unknown-domain');
// unknownDomainRedirectHandler is a function that redirects requests from unknown
// domains to the canonical domain. It is imported from the 'unknown-domain' module
// and assigned to the 'unknownDomainRedirectHandler' constant.

const healthCheckHandler = require('./health-check');
// healthCheckHandler is a function that handles health checks for the application.
// It is imported from the 'health-check' module and assigned to the 'healthCheckHandler' constant.

const app = express();
// Express application instance is created and assigned to the 'app' constant.

// If the request URL starts with '/fonts/', set the Cache-Control header to
// cache the response forever.
const immutableRootMatch = /^\/fonts\//;
const immutableRootHandler = (req, res, next) => {
  if (immutableRootMatch.test(req.url)) {
    res.setHeader('Cache-Control', 'max-age=31536000,immutable');
  }
  next();
};

const cspHandler = (_req, res, next) => {
  // Set the Content-Security-Policy-Report-Only header to a policy that restricts
  // the sources of objects, scripts, bases, frames, and reports.
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "object-src 'none'; " +
      "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com https://cdnjs.cloudflare.com https://www.gstatic.com https://www.google.com https://*.firebaseio.com https://shared-storage-demo-content-producer.web.app;" +
      "base-uri 'none'; " +
      "frame-ancestors 'self'; " +
      'report-uri https://csp.withgoogle.com/csp/chrome-apps-doc'
  );
  // Set the X-Frame-Options header to SAMEORIGIN to prevent clickjacking.
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
};

const handlers = [
  cspHandler,
  immutableRootHandler,
  buildStaticHandler(),
  healthCheckHandler,
  notFoundHandler,
];
// An array of middleware functions that handle requests and responses.

if (isGAEProd) {
  // If the application is running in Google App Engine production environment,
  // use the unknownDomainRedirectHandler as the first middleware function.
  handlers.unshift(unknownDomainRedirectHandler);
} else {
  // If the application is not running in Google App Engine production environment,
  // use the compression middleware function as the first middleware function.
  handlers.unshift(compression());
}

app.use(express.json());
// Use the express.json() middleware function to parse JSON request bodies.

app.use(express.urlencoded({extended: true}));
// Use the express.urlencoded() middleware function to parse URL-encoded request bodies.

app.post('/_render', renderHandler);
// Use the renderHandler function to handle POST requests to the '/_render' route

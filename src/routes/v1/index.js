const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const caseRoute = require('./case.route');
const practiceRoute = require('./practice.route');
const practiceStaffRoute = require('./practiceStaff.route');
const notificationRoute = require('./notification.route');
const cptRoute = require('./cpt.route');
const icdRoute = require('./icd.route');
const permissionRoute = require('./permission.route');
const roleRoute = require('./role.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/permissions',
    route: permissionRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/cases',
    route: caseRoute,
  },
  {
    path: '/practices',
    route: practiceRoute,
  },
  {
    path: '/practiceStaff',
    route: practiceStaffRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
  {
    path: '/uploads',
    route: notificationRoute,
  },
  {
    path: '/cpts',
    route: cptRoute,
  },
  {
    path: '/icds',
    route: icdRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

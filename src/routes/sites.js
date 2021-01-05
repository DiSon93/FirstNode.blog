const express = require('express');
// const route = require('.');
const router = express.Router();

const siteController = require('../app/controllers/SiteControllers');

router.get('/search', siteController.search);
router.get('/', siteController.home);

module.exports = router;

const express = require('express');
// const route = require('.');
const router = express.Router();

const newsController = require('../app/controllers/newsControllers');

router.get('/:slud', newsController.show);
router.get('/', newsController.index);

module.exports = router;

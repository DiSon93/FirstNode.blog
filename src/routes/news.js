const  express = require('express');
// const route = require('.');
const router = express.Router();

const newsController = require('../app/controllers/newsControllers')

router.use('/:slud', newsController.show);
router.use('/', newsController.index);

module.exports = router;
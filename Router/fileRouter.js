const express = require('express');
const router = express.Router();
const fileController = require('../Controller/fileController');
const uploadMiddleware = require('../Middleware/uploadMiddleware');

router.post('/', uploadMiddleware, fileController.uploadFile);
router.get('/:id', fileController.getFileById);

module.exports = router;

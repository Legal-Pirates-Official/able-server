const express = require('express');
const app = express();
const db = require('../database');

const router = express.Router();

// controllers
const { adminget, adminpost } = require('../controllers/admin.controller');
const {
	storiesGet,
	storiesPost,
	storiesDelete,
	storiesUpdate
} = require('../controllers/stories.controller');

router.get('/', adminget);
router.post('/', adminpost);

router.get('/stories', storiesGet);
router.post('/stories', storiesPost);
router.post('/stories/:id', storiesUpdate);
router.delete('/stories/:id', storiesDelete);

module.exports = router;

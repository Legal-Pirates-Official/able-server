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

const {aboutget, aboutupdate} = require('../controllers/home.controller');


router.get('/', adminget);
router.post('/', adminpost);

router.get('/about', aboutget);
router.post('/about', aboutupdate);

router.get('/stories', storiesGet);
router.post('/stories', storiesPost);
router.put('/stories/:id', storiesUpdate);
router.delete('/stories/:id', storiesDelete);

module.exports = router;

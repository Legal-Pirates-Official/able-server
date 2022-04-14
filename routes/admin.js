const express = require('express');
const app = express();
const db = require('../database');

const router = express.Router();

// controllers
const { adminget, adminpost ,getRequest,addSlot,getSlot,sendMail,mailer,meetLink,rejectRequest} = require('../controllers/admin.controller');
const {
	storiesGet,
	storiesPost,
	storiesDelete,
	storiesUpdate
} = require('../controllers/stories.controller');

const {aboutget, aboutupdate} = require('../controllers/home.controller');


router.get('/', adminget);
router.post('/', adminpost);
router.post('/reject', rejectRequest)
router.post('/meetlink', meetLink);
router.post('/mail',mailer)

router.get('/about', aboutget);
router.post('/about', aboutupdate);

router.get('/request', getRequest)
router.get('/stories', storiesGet);
router.post('/stories', storiesPost);
router.post('/stories/:id', storiesUpdate);
router.delete('/stories/:id', storiesDelete);

module.exports = router;

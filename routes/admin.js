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

const {aboutget, aboutupdate, getyoutube, youtubeInsert, deleteYoutube, getEvents,eventsInsert,deleteEvents} = require('../controllers/home.controller');


router.get('/', adminget);
router.post('/', adminpost);
router.post('/reject', rejectRequest)
router.post('/meetlink', meetLink);
router.post('/mail',mailer)

router.get('/home/about', aboutget);
router.post('/home/about', aboutupdate);

router.get('/home/youtube', getyoutube);
router.post('/home/youtube', youtubeInsert);
router.delete('/home/youtube/:id', deleteYoutube);

router.get('/home/events', getEvents);
router.post('/home/events', eventsInsert);
router.delete('/home/events/:id', deleteEvents);

router.get('/request', getRequest);
router.get('/stories', storiesGet);
router.post('/stories', storiesPost);
router.post('/stories/:id', storiesUpdate);
router.delete('/stories/:id', storiesDelete);

module.exports = router;

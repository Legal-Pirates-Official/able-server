const express = require('express');
const app = express();
const db = require('../database');
const { adminget, adminpost ,getRequest,addSlot,getSlot,sendMail} = require('../controllers/admin.controller');
const router = express.Router();




router.post("/addslot", addSlot);
router.post("/getslot/", getSlot);
router.post('/mail',sendMail)


module.exports = router;
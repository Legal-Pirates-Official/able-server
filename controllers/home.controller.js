const db = require('../database');

exports.aboutget = async (req, res) => {
	await db.query('SELECT * FROM homeabout', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(response);
		}
	});
};

exports.aboutupdate = async (req, res) => {
	await db.query(
		'UPDATE homeabout SET description = ?',
		[req.body.values.description],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

exports.getyoutube = async (req, res) => {
	await db.query('SELECT * FROM youtubevideos', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(response);
		}
	});
};

exports.youtubeInsert = async (req, res) => {
	await db.query(
		'INSERT INTO youtubevideos (thumbnail, video_url) VALUES (?, ?)',
		[req.body.photo, req.body.values.video_url],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

exports.deleteYoutube = async (req, res) => {
	await db.query(
		'DELETE FROM youtubevideos WHERE id = ?',
		[req.params.id],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

exports.getEvents = async (req, res) => {
	await db.query('SELECT * FROM liveevents', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(response);
		}
	});
};

exports.eventsInsert = async (req, res) => {
	await db.query(
		'INSERT INTO liveevents (thumbnail, event_url) VALUES (?, ?)',
		[req.body.photo, req.body.values.event_url],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

exports.deleteEvents = async (req, res) => {
	await db.query(
		'DELETE FROM liveevents WHERE id = ?',
		[req.params.id],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

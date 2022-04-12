const db = require('../database');

exports.storiesGet = async (req, res) => {
	console.log('hii');
	await db.query('SELECT * FROM stories', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(response);
		}
	});
};

exports.storiesPost = async (req, res) => {
	await db.query(
		`INSERT INTO stories SET video_title = ?,video_description = ?,video_url,video_type = ?`,
		[
			req.body.values.video_title,
			req.body.values.video_description,
			req.body.values.video_url,
			req.body.values.video_type
		],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

exports.storiesUpdate = async (req, res) => {
	await db.query(
		`UPDATE stories SET video_description = ?,video_title = ? ,video_type = ?,video_url = ? WHERE id = ?`,
		[
			req.body.values.video_description,
			req.body.values.video_title,
			req.body.values.video_type,
			req.body.values.video_url,
			req.params.id
		],
		(err, response) => {
			if (err) {
				return console.log(err, 'error');
			} else {
				res.json(response);
			}
		}
	);
};

exports.storiesDelete = async (req, res) => {
	await db.query(
		`DELETE FROM stories WHERE id = ?`,
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

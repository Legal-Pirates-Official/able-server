const db = require('../database');

exports.storiesGet = async (req, res) => {
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
		`INSERT INTO stories SET video_title = ?,video_description = ?,video_url = ? ,video_type = ?, video_thumbnail = ?`,
		[
			req.body.values.title,
			req.body.values.description,
			req.body.values.video_url,
			req.body.values.video_type,
			req.body.photo
				? req.body.photo
				: 'https://wallpaperaccess.com/full/3458147.jpg'
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
		`UPDATE stories SET video_description = ?,video_title = ? ,video_type = ?,video_url = ?, video_thumbnail = ? WHERE id = ?`,
		[
			req.body.values.description,
			req.body.values.title,
			req.body.values.video_type,
			req.body.values.video_url,
			req.body.photo
				? req.body.photo
				: 'https://wallpaperaccess.com/full/3458147.jpg',
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

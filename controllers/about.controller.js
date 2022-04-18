const db = require('../database');

exports.about_get = async (req, res) => {
	await db.query('SELECT * FROM about', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(response);
		}
	});
};

exports.about_post = async (req, res) => {
	console.log(req.body);
	await db.query(
		`INSERT INTO about SET about = ?,card_title = ? ,card_description = ?,card_image = ?`,
		[
			req.body.values.about_description,
			req.body.values.card_title,
			req.body.values.card_description,
			req.body.photo ? req.body.photo : 'nul'
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

exports.about_update = async (req, res) => {
	await db.query(
		`UPDATE about SET about_description = ?,card_title = ? ,card_description = ?,card_image = ? WHERE id = ?`,
		[
			req.body.values.about_description,
			req.body.values.card_title,
			req.body.values.card_description,
			req.body.photo ? req.body.photo : 'nul',
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

exports.about_delete = async (req, res) => {
	await db.query(
		`DELETE FROM about WHERE id = ?`,
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

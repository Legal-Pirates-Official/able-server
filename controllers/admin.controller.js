const db = require('../database');

exports.adminget = async (req, res) => {
	await db.query('SELECT * FROM about', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(response);
		}
	});
};

exports.adminpost = async (req, res) => {
	console.log(req.body);
	await db.query(
		`INSERT INTO admin SET about_description = ?,card_title = ? ,card_description = ?,card_image = ?`,
		[
			req.body.values.about_description,
			req.body.values.card_title,
			req.body.values.card_description,
			req.body.photo
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
exports.getRequest = async (req, res) => {
	console.log('s');
	await db.query('SELECT booked_slot FROM Meet', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			console.log(response);
			res.status(200).json(response);
		}
	});
}
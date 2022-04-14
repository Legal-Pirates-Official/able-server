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
    console.log(req.body);
    await db.query('UPDATE homeabout SET description = ?', [req.body.description], (err, response) => { 
        if (err) {
            return console.log(err, 'error');
        } else {
            res.json(response);
        }
    });
}


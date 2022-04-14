const db = require("../database");


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
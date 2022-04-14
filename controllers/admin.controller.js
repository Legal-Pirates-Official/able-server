const db = require("../database");
const nodemailer = require("nodemailer");

exports.addSlot = async (req, res) => {
  const { time_slot, date, meetLink, email } = req.body;
  console.log(time_slot, "p", date, "ll", meetLink, email);

  console.log(Object.keys(time_slot).length);
  var arr = [];
  for (let index = 0; index < Object.keys(time_slot).length / 2; index++) {
    // const element = array[index];
    var obj = {};
    // arr.push(time_slot[index]);
    obj = {
      time_slot: time_slot[`time_slot${index}`],

      time_slot_am_pm: time_slot[`time_slot${index}_am_pm`],
    };
    arr.push(obj);
  }
  console.log(arr, "kjj");
  var json = JSON.stringify(arr);

  await db.query(
    "INSERT into Meet SET time_slot = ? , date = ?",
    [json, date],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(response);
      }
    }
  );
};
exports.meetLink = async (req, res) => {
	const {meetLink,email,password} = req.body;
	await db.query("SELECT meetLink FROM Mail", (err, response) => {
		if (err) {
			console.log(err);
		} else { 
			if(response.length > 0){
        db.query('SELECT * from Mail',(err,res)=>{
          if(err){
            console.log(err);
          }else{
            console.log(res[0]);
            var link;
            var mail;
            var pass;
            meetLink.length == 0 ? (link = res[0].meetLink) : (link = meetLink);
            email.length == 0 ? (mail = res[0].email) : (mail = email);
            password.length == 0 ? (pass = res[0].password) : (pass = password);
            db.query('UPDATE Mail SET meetLink = ? , email = ? , password = ?',[link,mail,pass],(err,response1)=>{
              if(err){
                console.log(err);
              }else{
                console.log(response1);
                
              }
            })
          }


        })
				
			} else {
				db.query('INSERT into Mail SET meetLink = ? , email = ? , password = ?',[meetLink,email,password],(err,response1)=>{
					if(err){
						console.log(err);
					}else{
						res.status(200).json(response1);
					}
				})
			}
		}
	})
}
exports.getSlot = async (req, res) => {
  const { date } = req.body;
  console.log(date, "p");

  await db.query(
    "SELECT * from Meet WHERE date = ?",
    [date],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
        res.status(200).json(response);
      }
    }
  );
};

exports.sendMail = async (req, res) => {
  const { email, name, date, timeslot, slots } = req.body;
  console.log(req.body, "p");
  var obj = {
    name: name,
    email: email,
    timeslot: timeslot,
    date: date,
  };
  var json = [obj];
  var json2;
  var booked_slot_array;
  var newslot = JSON.stringify(
    slots.filter((item) => item.time_slot !== timeslot.time_slot)
  );
  var booked_slot = JSON.stringify(json);
  console.log(booked_slot);

  await db.query(
    "SELECT booked_slot from Meet WHERE date = ?",
    [date],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        if (response[0].booked_slot != null) {
          console.log(response[0].booked_slot);
          booked_slot_array = JSON.parse(response[0].booked_slot);
          // res.status(200).json(response);
          booked_slot_array.push(obj);
          booked_slot = JSON.stringify(booked_slot_array);
        }

        db.query(
          "UPDATE Meet SET booked_slot = ? , time_slot = ? WHERE date = ?",
          [booked_slot, newslot, date],
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log(response);
              res.status(200).json(response);
            }
          }
        );
      }
    }
  );
};
exports.adminget = async (req, res) => {
  await db.query("SELECT * FROM about", (err, response) => {
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
      req.body.photo,
    ],
    (err, response) => {
      if (err) {
        return console.log(err, "error");
      } else {
        res.json(response);
      }
    }
  );
};
exports.getRequest = async (req, res) => {
  console.log("s");
  await db.query("SELECT booked_slot FROM Meet", (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.status(200).json(response);
    }
  });
};
exports.mailer = async (req, res) => {
	const {email,timeslot} = req.body;
  await db.query("SELECT * FROM Mail", (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      if(response.length > 0){
        let transporter = nodemailer.createTransport({
          service: "Gmail",
            host: 'smtp.gmail.com',
            // true for 465, false for other ports
            auth: {
              user: response[0].email, // generated ethereal user
              pass:  response[0].password, // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info =  transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email.trim(), // list of receivers
            subject: 'Meet Timings', // Subject line
            text: `You meet timing is ${timeslot.time_slot}-${timeslot.time_slot_am_pm} Link:${response[0].meetLink}`, // plain text body
           // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // res.status(200).json(response);
      } else {
        console.log("no mail");
      }
      
    }
  });
  
};




exports.rejectRequest = async (req, res) => {
  const {email,date} = req.body;
  db.query('SELECT booked_slot from Meet WHERE date = ?',[date],(err,response)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(response);
      if(response[0].booked_slot != null){
        var booked_slot_array = JSON.parse(response[0].booked_slot);
        var new_booked_slot_array = booked_slot_array.filter((item)=>item.email !== email);
        var new_booked_slot = JSON.stringify(new_booked_slot_array);
        db.query(`UPDATE Meet SET booked_slot = ? WHERE date = ?`, [new_booked_slot,date],(err,response)=>{
          if(err){
            console.log(err);
          }
          else{
            console.log(response);
            res.status(200).json(response);
          }
        })
      }

    }
  })
};
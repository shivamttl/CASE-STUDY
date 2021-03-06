var nodemailer = require('nodemailer');
const dataBase = require("../models/User");
const jwt = require('jsonwebtoken');
const axios = require("axios");
const { response } = require("express");
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    //err.errors will find errors property inside err message
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 1000 * 60 * 60; //milliseconds
const createToken = (id, role) => {
  // return jwt.sign({ id }, 'hotel management', { //id is payload next is secret
  //   expiresIn: maxAge
  // });
  if (role == "reception") {
    return jwt.sign({ id }, 'reception', { //id is payload next is secret
      expiresIn: maxAge
    });
  } else {
    if (role == "manager") {
      return jwt.sign({ id }, 'manager', { //id is payload next is secret
        expiresIn: maxAge
      });
    } else {
      if (role == "owner") {
        return jwt.sign({ id }, 'owner', { //id is payload next is secret
          expiresIn: maxAge
        });
      }
    }
  }

};


// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup'); //finds in views folder
}

module.exports.login_get = (req, res) => {
  res.render('login');
}
//showusers and createuser are for swagger only
module.exports.showusers = (req, res) => {
  dataBase.find().then((items) => {
    res.json(items)
  }).catch(err => {
    res.sendStatus(404);
    throw err;
  })
}
module.exports.showuser = (req, res) => {
  dataBase.findById(req.params.id).then((data) => {
    if (data) {
      res.json(data)
    } else {
      res.sendStatus(404);
    }
  }).catch((err) => {
    if (err) {
      res.sendStatus(404);
      throw err;
    }
  })
}

module.exports.deleteuser = (req, res) => {
  dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch((err) => {
    if (err) {
      res.sendStatus(404);
      throw err;
    }
  })
  res.send("deleted");
}



module.exports.createuser = (req, res) => {
  var data = new dataBase(req.body);
  data.save().then(() => {
    console.log("new data created")
  }).catch((err) => {
    res.sendStatus(404);
    throw err;
  })
  console.log(req.body);
  res.send("data sent")
}


module.exports.signup_post = async (req, res) => {
  const { email, password, role } = req.body; //req.body contains data passed by user
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hotelcasestudy@gmail.com',
        pass: 'casestudy2021'
      }
    });

    var mailOptions = {
      from: 'hotelcasestudy@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      // text: `sent ${email}  ${role}  ${password} from nodejs.`,
      html: `<h1>Hi ${email} </h1><h2> Welcome as ${role}</h2> <p>Your Password:${password} </p> `
    };
    const user = await dataBase.create({ email, password, role }); //sends data to databse
    // const token = createToken(user._id); //creating jwt at the time of signup (to be removed for case study as no need to create tokken)
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.sendStatus(404);
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ user: user._id });
  }
  catch (err) {
    res.sendStatus(404);
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }

}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await dataBase.login(email, password); //cheching email and password in database
    const token = createToken(user._id, user.role);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user.role });
  }
  catch (err) {
    const errors = handleErrors(err);// to display at html
    res.status(404).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
module.exports.update = (req, res) => {
  dataBase.findByIdAndUpdate(req.params.name, req.body).then((items) => {
    res.send(items);
  }).catch((err) => {
    res.sendStatus(404);
    console.log(err);
  })
}

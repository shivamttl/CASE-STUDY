const dataBase = require("../collections");
const axios=require("axios");
module.exports.create =  (req, res) => {
    var data = new dataBase(req.body);
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        throw err;
    })
    console.log(req.body);
    res.send("data sent")
}

//get all
module.exports.read =  (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        throw err;
    })
}

//get by id
module.exports.readOne =  (req, res) => {
    dataBase.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data)
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
}

//put update
module.exports.update =  (req, res) => {
    dataBase.findByIdAndUpdate(req.params.name, req.body).then((items) => {
        res.send(items);
    }).catch((err) => {
        console.log(err);
    })
}

//delete by id
module.exports.delete =  (req, res) => {
    dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch((err) => {
        if (err) {
            throw err;
        }
    })
    res.send("deleted");
}

module.exports.availableRoom = (req, res) => {
    axios.get("http://localhost:2000/room/availableRoom").then((response) => {
      var views = response.data;
      res.send(views);
    }).catch((err) => {
      if (err)
        throw err;
    })
  }
  module.exports.occupiedRoom = (req, res) => {
    axios.get("http://localhost:2000/room/occupiedRoom").then((response) => {
      var views = response.data;
      res.send(views);
    }).catch((err) => {
      if (err)
        throw err;
    })
  }
  module.exports.checkIn = (req, res) => {
    const number = req.params.number;
    axios.put("http://localhost:2000/room/checkIn/"+number, number).then((response) => {
      var views = response.data;
      res.send(views);
    }).catch((err) => {
      if (err)
        throw err;
    })
  }
  //both ways work same
  module.exports.checkOut = (req, res) => {
    axios.put("http://localhost:2000/room/checkOut/"+req.params.number).then((response) => {
      var views = response.data;
      res.send(views);
    }).catch((err) => {
      if (err)
        throw err;
    })
  }



const express = require("express");
const { check, validationResult } = require("express-validator");
//var emailCheck = require("email-check");
const mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

con.connect(function (error) {
  if (error) throw error;
  console.log("connected");
});

const students = require("./students");

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("listening to port 4000");
});

app.get("/students", (req, res) => {
  con.query("select * from students", function (error, result) {
    if (error) {
      console.log(error);
    } else {
      return res.json(result);
    }
  });

  // return res.json(students);
});

app.post(
  "/students",
  [
    check("name", "Name should be only alphabetical characters").isAlpha(),
    check("email", "Email is already existing,try some anothe email")
      .isEmail()
      .withMessage("Provide valid email"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    if (!req.body.email) {
      return res.status(400).json({ error: "email is required..." });
    }

    const email = req.body.email;
    let index = students.findIndex((student) => {
      console.log(student);
      return student.email === email;
    });
    if (index > 0) {
      return res.status(400).json({ error: "email is already existing..." });
    }

    const user = {
      id: students.length + 1,
      name: req.body.name,
      city: req.body.city,
      email: req.body.email,
    };

    students.push(user);
    return res.json(user);

    // console.log(req.body);
    // res.send("students post request");
  }
);

app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let city = req.body.city;
  let email = req.body.email;

  let index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  // if (!req.body.name || !req.body.city || !req.body.email) {
  //   return res.status(404).json({ error: "name,city and email are required" });
  // }

  if (index > 0) {
    let std = students[index];

    if (req.body.name && req.body.city && req.body.email) {
      std.name = req.body.name;
      std.city = req.body.city;
      std.email = req.body.email;
    } else if (req.body.name && req.body.city) {
      std.name = req.body.name;
      std.city = req.body.city;
    } else if (req.body.name && req.body.email) {
      std.name = req.body.name;
      std.email = req.body.email;
    } else if (req.body.city && req.body.email) {
      std.city = req.body.city;
      std.email = req.body.email;
    } else if (req.body.name) {
      std.name = req.body.name;
    } else if (req.body.city) {
      std.city = req.body.city;
    } else if (req.body.email) {
      std.email = req.body.email;
    }

    // std.name = name;
    // std.city = city;
    // std.email = email;

    res.json(std);
  } else {
    res.status(404);
  }
});

app.delete("/students/:id", (req, res) => {
  let id = req.params.id;
  let index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  if (index > 0) {
    let std = students[index];
    students.splice(index, 1);
    res.json(std);
  } else {
    res.status(404);
  }
});

// let items=[];

// //create operation
// app.post('/items',(req,res) =>{
//     const newItem = req.body;
//     items.push(newItem);
//     res.status(201).json(newItem);
// })

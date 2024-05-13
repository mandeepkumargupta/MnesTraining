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

    const email = req.body.email;
    const id = req.body.id;
    const name = req.body.name;
    const city = req.body.city;

    con.query("select * from students where email=?", email, (err, results) => {
      if (err) {
        console.log(err);
        //return;
      } else {
        if (results.length > 0) {
          return res.status(409).json({ message: "email already exists" });
        } else {
          con.query(
            "insert into students values(?,?,?,?)",
            [id, name, city, email],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                return res.send("Posted");
              }
            }
          );
        }
      }
    });
  }
);

app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let city = req.body.city;
  let email = req.body.email;

  const updatables = {
    name: "man",
    city: "bth",
    email: "man@gmail.com",
  };

  let concatStr = "",
    updateValues = [];

  for (const key in updatables) {
    if (Object.hasOwnProperty.call(updatables, key)) {
      const element = updatables[key];
      concatStr += ` ${key}=?,`;
      console.log(concatStr);
      updateValues.push(element);
    }
  }
  // name=?, email=?, = 10
  const strLen = concatStr.length;
  concatStr = concatStr.slice(0, strLen - 1);
  console.log(`UPDATE students SET ${concatStr} WHERE id = ?`);
});

app.delete("/students/:id", (req, res) => {
  let id = req.params.id;
  con.query("delete from students where id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted");
    }
  });
});

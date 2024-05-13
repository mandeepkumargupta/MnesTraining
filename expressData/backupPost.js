app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let city = req.body.city;
  let email = req.body.email;

  if (name && city && email) {
    con.query(
      "update students set name=?,city=?,email=? where id=?",
      [name, city, email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  } else if (name && city) {
    con.query(
      "update students set name=?,city=? where id=?",
      [name, city, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  } else if (name && email) {
    con.query(
      "update students set name=?,email=? where id=?",
      [name, email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  } else if (city && email) {
    con.query(
      "update students set city=?,email=? where id=?",
      [city, email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  } else if (name) {
    con.query(
      "update students set name=? where id=?",
      [name, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  } else if (city) {
    con.query(
      "update students set city=? where id=?",
      [city, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  } else if (email) {
    con.query(
      "update students set email=? where id=?",
      [email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      }
    );
  }
});

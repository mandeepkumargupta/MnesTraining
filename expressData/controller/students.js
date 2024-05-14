const dataRepositories = require("../repositories/students");
const validator = require("validator");
exports.getAllData = async (req, res) => {
  try {
    const results = await dataRepositories.getAllData();
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error retrieving data");
  }
};

exports.createData = async (req, res) => {
  const { name, city, email } = req.body;
  if (!validator.isAlpha(name)) {
    return res.status(400).send("Name should contain only alphabets");
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email address");
  }

  const data = { name, city, email };
  try {
    const existingData = await dataRepositories.getDataByEmail(email);
    if (existingData.length > 0)
      return res.status(400).json({
        status: 400,
        message: `Email ${email} already exists`,
      });

    await dataRepositories.createData(data);
    //res.status(201).send("Record created successfully");
    res.status(201).json({
      status: 201,
      message: "Record created successfully",
    });
  } catch (error) {
    //res.status(500).send("error creating record");
    res.status(500).json({
      status: 500,
      message: "Error creating record",
      error: error.message,
    });
  }
};

exports.getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await dataRepositories.getDataById(id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error retrieving data");
  }
};

exports.getDataByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const results = await dataRepositories.getDataById(email);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error retrieving data");
  }
};
exports.updateData = async (req, res) => {
  const { id } = req.params;
  const { name, city, email } = req.body;
  const newData = {};
  if (name) {
    if (!validator.isAlpha(name)) {
      return res.status(400).send("Name should contain only alphabets");
    }
    newData.name = name;
  }
  if (city) {
    newData.city = city;
  }
  if (email) {
    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email address");
    }
    newData.email = email;
  }
  try {
    await dataRepositories.updateData(id, newData);
    //res.status(200).send("Record updated successfully");
    res.status(200).json({
      status: 200,
      message: "Record updated successfully",
    });
  } catch (error) {
    // res.status(500).send("Error updating record");
    res.status(500).json({
      status: 500,
      message: "Error updating record",
      error: error.message,
    });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await dataRepositories.getDataById(id);
    await dataRepositories.deleteData(id);
    // res.status(200).send("Record deleted successfully");
    res.status(200).json({
      status: 200,
      message: "Record deleted successfully",
      deletedData: deletedData,
    });
  } catch (error) {
    //res.status(500).send("Error deleting record");
    res.status(500).json({
      status: 500,
      message: "Error deleting record",
      error: error.message,
    });
  }
};
// exports.getAllData = (req, res) => {
//   dataRepositories.getAllData((error, results) => {
//     if (error) throw error;
//     res.status(200).json(results);
//   });
// };

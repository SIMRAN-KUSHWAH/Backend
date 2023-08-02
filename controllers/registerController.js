import registerModel from "../models/registerModel.js";
import JWT from "jsonwebtoken";

// Register Controller
export const registerParentsController = async (req, res) => {
  try {
    const { name, studentName, number, email, password, class: userClass } =
      req.body;

    // Validations
    if (!name || !studentName || !number || !email || !password || !userClass) {
      return res.send({ message: "Please enter all the required fields" });
    }
    if (!email.includes("@")) {
      return res.send({ message: "Please enter a valid Email" });
    }

    // Already Existing Users
    const existParent = await registerModel.findOne({ email });
    if (existParent) {
      return res.status(200).send({
        success: false,
        message: "Email ID already exists for another user",
      });
    } else {
      // Save User
      const parent = await new registerModel({
        name,
        studentName,
        number,
        email,
        password,
        class: userClass,
      }).save();

      res.status(201).send({
        success: true,
        message: "Registration Successful",
        parent,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration Failed",
      error,
    });
  }
};

// Login Controller
export const loginParentController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Check User
    const parent = await registerModel.findOne({ email });
    if (!parent) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const match = await registerModel.findOne({ password });
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Success",
      user: {
        _id: parent._id,
        name: parent.name,
        studentName: parent.studentName,
        number: parent.number,
        email: parent.email,
        password: parent.password,
        class: parent.class,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Failed",
      error,
    });
  }
};

export const getparentsController = async (req, res) => {
  try {
    console.log('Inside getparentsController'); // Check if the controller is being called
    const users = await registerModel.find();
    console.log(users); // Check the retrieved users
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch users",
      error,
    });
  }
};


// Delete User Controller
export const deleteParentController = async (req, res) => {
  try {
    const { userId } = req.params;
    await registerModel.findByIdAndDelete(userId);
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to delete user",
      error,
    });
  }
};

// Update User Controller
export const updateparentController = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    await registerModel.findByIdAndUpdate(userId, updatedData);
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to update user",
      error,
    });
  }
};

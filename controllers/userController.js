import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name,userId, email, password, type, status, qualify, address } =
      req.body;

    // Validations
    if (!name) {
      return res.send({ message: "Please enter a Name" });
    }
    if (!email) {
      return res.send({ message: "Please enter an Email" });
    }
    if (!password) {
      return res.send({ message: "Please enter a Password" });
    }
    if (!email.includes("@")) {
      return res.send({ message: "Please enter a valid Email" });
    }

    // Already Existing Users
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(200).send({
        success: false,
        message: "Email ID already exists for another user",
      });
    } else {
      // Save User
      const user = await new userModel({
        name,
        userId,
        email,
        password,
        type,
      }).save();

      res.status(201).send({
        success: true,
        message: "Registration Successful",
        user,
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
export const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validation
    if (!userId || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Check User
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const match = await userModel.findOne({ password });
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
        _id: user._id,
        name: user.name,
        userId: user.userId,
        email: user.email,
        password: user.password,
        type: user.type,
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

// Get Users Controller
export const getUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
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
export const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    await userModel.findByIdAndDelete(userId);
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
export const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    await userModel.findByIdAndUpdate(userId, updatedData);
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
export const logoutController = async (req, res) => {
  try {
    // Implement any necessary logic for logging out the user here, such as invalidating the token or clearing session data.
    // For example, you can simply send a success message as follows:
    res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Logout failed",
      error,
    });
  }
};
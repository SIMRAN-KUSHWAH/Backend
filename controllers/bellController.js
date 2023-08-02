import bellModal from "../models/bellModal.js";


// add notification
export const addBellController = async (req, res) => {
    try {
      const { fromid, toid, subject, message } = req.body;
  
      // Validations
      if (!subject) {
        return res.send({ message: "Please enter a Subject" });
      }
      if (!message) {
        return res.send({ message: "Please enter a Message" });
      }
      if (!toid) {
        return res.send({ message: "Please enter an Email" });
      }
      if (!toid.includes("@")) {
        return res.send({ message: "Please enter a valid Email" });
      }
  
      const bell = await new bellModal({
        fromid,
        toid,
        subject,
        message,
      }).save();
      res.status(200).send({
        success: true,
        message: "New Notification Added Successfully!",
        bell,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Failed to Add New Notification!",
        error: error.message,
      });
    }
  };
  
  // get norofications
  export const getBellController = async (req, res) => {
    try {
      const bells = await bellModal.find({});
      res.status(200).send({
        success: true,
        message: "All Notifications Fetched Successfully!",
        bells,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Failed To Fetch Notification!",
        error: error.message,
      });
    }
  };
  
  // delete notification
  export const deleteBellController = async (req, res) => {
    try {
      const bellId = req.params.id;
      const bell = await bellModal.findByIdAndDelete(bellId);
      res.status(200).send({
        success: true,
        message: "Selected Notification Deleted Successfully",
        bell,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Deletion Failed!",
        error: error.message,
      });
    }
  };
  
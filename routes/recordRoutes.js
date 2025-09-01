// ======= routes/recordRoutes.js =======
const express = require("express");
const Record = require("../models/Record");
const { encrypt, decrypt } = require("../utils/encryption");

const router = express.Router();

// Fetch all medical records
router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    const decryptedRecords = records.map((record) => {
      return {
        ...record._doc,
        _id: record._id,
        name: decrypt(record.name),
        age: decrypt(record.age),
        gender: decrypt(record.gender),
        bloodType: decrypt(record.bloodType),
        allergies: decrypt(record.allergies),
        diagnosis: decrypt(record.diagnosis),
        treatment: decrypt(record.treatment),
      };
    });

    res.status(200).json(decryptedRecords);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

// Add a new medical record
router.post("/add", async (req, res) => {
  try {
    const encryptedData = {
      walletAddress: req.body.walletAddress,
      name: encrypt(req.body.name),
      age: encrypt(req.body.age.toString()),
      gender: encrypt(req.body.gender),
      bloodType: encrypt(req.body.bloodType),
      allergies: encrypt(req.body.allergies),
      diagnosis: encrypt(req.body.diagnosis),
      treatment: encrypt(req.body.treatment),
    };

    const newRecord = new Record(encryptedData);
    await newRecord.save();
    res.status(201).json({ message: "Record stored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to store record" });
  }
});

// Delete a medical record by Name
router.delete("/delete/:name", async (req, res) => {
  try {
    const name = encrypt(req.params.name);
    const deletedRecord = await Record.findOneAndDelete({ name });
    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: `Record with name deleted successfully` });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

module.exports = router;
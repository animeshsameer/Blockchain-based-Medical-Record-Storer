import React, { useState } from "react";
import "./form.css";
import { submitRecord } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Submit to blockchain
    await submitRecord(
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      provider,
      medical,
      dispatch
    );

    // Store in MongoDB
    const recordData = {
      walletAddress: account,
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      timestamp: Date.now()
    };

    try {
      await fetch("http://localhost:5000/api/records/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recordData),
      });
    } catch (error) {
      console.error("Error storing record in MongoDB:", error);
    }

    // Reset form fields
    setName("");
    setAge("");
    setGender("");
    setBloodType("");
    setAllergies("");
    setDiagnosis("");
    setTreatment("");
  };

  return (
    <div className="login-container">
      {account ? (
        <form onSubmit={submitHandler}>
          <h1>Patient Details</h1>
          <label htmlFor="name">Patient Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="19" />
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="bloodType">Blood type:</label>
          <input type="text" id="bloodType" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required placeholder="B positive" />
          <label htmlFor="allergies">Allergies:</label>
          <input type="text" id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} required placeholder="Pollen allergy" />
          <label htmlFor="diagnosis">Diagnosis:</label>
          <input type="text" id="diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required placeholder="Osteoporosis" />
          <label htmlFor="treatment">Treatment:</label>
          <input type="text" id="treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} required placeholder="Surgery" />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <h1>Connect the account</h1>
      )}
    </div>
  );
};

export default Form;

import React, { useEffect, useState } from "react";
import "./data.css";
import { dataBookSelector } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../store/interactions";

const Data = () => {
  const [mongoRecords, setMongoRecords] = useState([]);
  const [nextRecordId, setNextRecordId] = useState(0); // Keep track of the next record ID for MongoDB

  const orderData = useSelector(dataBookSelector); // Blockchain data
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const dispatch = useDispatch();

  // ✅ Fetch MongoDB records on mount
  useEffect(() => {
    const fetchMongoRecords = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/records");
        const data = await res.json();
        setMongoRecords(data);

        // Set the next record ID for MongoDB to continue from where blockchain records end
        if (data.length > 0) {
          const lastMongoRecord = data[data.length - 1];
          setNextRecordId(lastMongoRecord.recordId + 1); // Set the next record ID
        }
      } catch (err) {
        console.error("Error fetching MongoDB records:", err);
      }
    };

    fetchMongoRecords();
  }, []);

  const deleteHandler = async (e, data) => {
    if (window.confirm("Do you want to delete the record?")) {
      // Delete from blockchain
      deleteData(medical, data.recordId, dispatch, provider);

      // ✅ Also delete from MongoDB
      try {
        await fetch(`http://localhost:5000/api/records/delete/${data.name}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        // Remove from local MongoDB state
        setMongoRecords((prev) =>
          prev.filter((record) => record.name !== data.name)
        );
      } catch (error) {
        console.error("Error deleting record from MongoDB:", error);
      }
    } else {
      console.log("Data not deleted");
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <h2>Blockchain & MongoDB Medical Records</h2>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Date and Time</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Source</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              
               

              {/* 🧾 MongoDB Records */}
              {mongoRecords &&
                mongoRecords.map((data, index) => {
                  // Ensure recordId is valid and incremented correctly, starting from nextRecordId
                  const recordId = nextRecordId + index;
                  return (
                    <tr key={`mongo-${index}`}>
                      <td>{data._id}</td> {/* Use recordId from nextRecordId + index */}
                      <td>{data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date(data.timestamp).toLocaleString()}</td>
                      <td>{data.name}</td>
                      <td>{data.age}</td>
                      <td>{data.gender}</td>
                      <td>{data.bloodType}</td>
                      <td>{data.allergies}</td>
                      <td>{data.diagnosis || "N/A"}</td> {/* Add fallback for empty diagnosis */}
                      <td>{data.treatment || "N/A"}</td> {/* Add fallback for empty treatment */}
                      <td>MongoDB</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={(e) => deleteHandler(e, data)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Connect the account</h1>
      )}
    </div>
  );
};

export default Data;

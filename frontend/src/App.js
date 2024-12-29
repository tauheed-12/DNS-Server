import React, { useEffect, useState } from "react";
import RecordTable from "./components/RecordTable";
import AddRecordForm from "./components/AddRecordForm";
import QueryDNSForm from "./components/QueryDnsForm";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/records");
        setRecords(response.data.records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  const addRecord = async (newRecord) => {
    try {
      const response = await axios.post("http://localhost:5000/api/records", newRecord);
      if (response.status === 200) {
        setRecords((prevRecords) => [...prevRecords, newRecord]);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <div className="app">
      <h1>DNS Server Management</h1>
      <div className="record-container-design">
        <AddRecordForm onAddRecord={addRecord} />
        <RecordTable records={records} />
      </div>
      <QueryDNSForm />
    </div>
  );
};

export default App;

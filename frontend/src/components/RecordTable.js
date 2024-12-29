import React from "react";
import "./RecordTable.css";  // External CSS file for styling

const RecordTable = ({ records }) => {
    return (
        <div className="table-container">
            <h2>DNS Records</h2>
            <table className="record-table">
                <thead>
                    <tr>
                        <th>Domain Name</th>
                        <th>Type</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.name}</td>
                            <td>{record.type}</td>
                            <td>{record.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecordTable;

import React, { useState } from "react";
import "./AddRecordForm.css";  // External CSS file for styling

const AddRecordForm = ({ onAddRecord }) => {
    const [formData, setFormData] = useState({ name: "", type: "", data: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRecord(formData);
        setFormData({ name: "", type: "", data: "" });
    };

    return (
        <div className="add-record-form-container">
            <h2>Add DNS Record</h2>
            <form onSubmit={handleSubmit} className="add-record-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Domain Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Record Type (e.g., A, CNAME)"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="data"
                    placeholder="Record Data (e.g., 1.2.3.4)"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-btn">Add Record</button>
            </form>
        </div>
    );
};

export default AddRecordForm;

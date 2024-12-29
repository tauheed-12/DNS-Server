import React, { useState } from "react";
import "./QueryDNSForm.css";

const QueryDNSForm = () => {
    const [domain, setDomain] = useState("");
    const [queryResult, setQueryResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/query?domain=${domain}`);

            if (!response.ok) {
                throw new Error("Failed to fetch DNS record.");
            }

            const data = await response.json();
            console.log("Query Result:", data);
            setQueryResult(data);
        } catch (error) {
            console.error("Error querying DNS record:", error);
            alert("An error occurred while querying the DNS record.");
        }
    };

    return (
        <div className="dns-container">
            <div className="dns-form-container">
                <h1>DNS Server Query</h1>
                <form onSubmit={handleSubmit} className="dns-query-form">
                    <input
                        type="text"
                        placeholder="Enter Domain Name"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="dns-input"
                        required
                    />
                    <button type="submit" className="dns-submit-btn">Query DNS</button>
                </form>
            </div>

            {queryResult && (
                <div className="dns-result-container">
                    <h3>Query Result:</h3>
                    <pre>{JSON.stringify(queryResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default QueryDNSForm;

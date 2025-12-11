import React from "react";

const CompletedTasks = ({ completed }) => {
  return (
    <div style={{
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px",
      background: "#f4f4f4"
    }}>
      <h3>Completed Tasks</h3>
      {completed.length === 0 ? (
        <p>No completed tasks</p>
      ) : (
        completed.map((item, index) => (
          <p key={index}>✔️ {item.title}</p>
        ))
      )}
    </div>
  );
};

export default CompletedTasks;

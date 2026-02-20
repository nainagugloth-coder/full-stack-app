import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    const res = await fetch("http://localhost:5000/feedback");
    const data = await res.json();
    setFeedbackList(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, feedback }),
    });

    setName("");
    setFeedback("");
    fetchFeedback();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Student Feedback App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <h2>All Feedback</h2>
      {feedbackList.map((item, index) => (
        <div key={index}>
          <strong>{item.name}</strong>: {item.feedback}
        </div>
      ))}
    </div>
  );
}

export default App;

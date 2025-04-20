import React, { useState } from "react";

const HelpCenter: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHelpRequest = async () => {
    setLoading(true);
    setAnswer("");

    // Simulated API call - replace this with your real endpoint
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        "how to start": "Click on 'Start Quiz' to begin.",
        "how to restart": "Click 'Restart' at the bottom of the page.",
        "help": "You can ask questions like 'how to submit', 'how to restart', etc.",
      };
      const key = question.toLowerCase();
      setAnswer(mockResponses[key] || "Sorry, I didn’t get that. Please try rephrasing.");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-lg mt-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3">🤖 Help Center</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleHelpRequest}
        disabled={loading || !question.trim()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {answer && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-300">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default HelpCenter;

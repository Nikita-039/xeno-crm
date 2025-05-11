'use client';

import { useState } from 'react';

export default function MessageGenerator() {
  const [goal, setGoal] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!goal) return;
    setLoading(true);
    setMessages([]);
    setError('');

    try {
      const res = await fetch('/api/generate-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal })
      });

      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      } else {
        throw new Error(data.error || 'Failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm my-4">
      <h5>🎯 AI Message Generator</h5>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="E.g. Bring back inactive users"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Messages'}
      </button>

      {error && <p className="text-danger">❌ {error}</p>}

      {messages.length > 0 && (
        <ul className="list-group">
          {messages.map((msg, i) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
              {msg}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => navigator.clipboard.writeText(msg)}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

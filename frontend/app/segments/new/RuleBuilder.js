'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const fields = ['totalSpend', 'visits', 'lastActive'];
const operators = ['>', '<', '='];

export default function RuleBuilder() {
  const { data: session } = useSession();
  const router = useRouter(); 
  const [segmentName, setSegmentName] = useState('');
  const [conditions, setConditions] = useState([
    { field: '', operator: '', value: '', logic: 'AND' }
  ]);
  const [previewCount, setPreviewCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '', logic: 'AND' }]);
  };

  const removeCondition = (index) => {
    const updated = [...conditions];
    updated.splice(index, 1);
    setConditions(updated);
  };

  const updateCondition = (index, key, value) => {
    const updated = [...conditions];
    updated[index][key] = value;
    setConditions(updated);
  };

  const handlePreview = async () => {
    setIsLoading(true);
    setError('');
    setPreviewCount(null);

    try {
      const response = await fetch('/api/segments/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: conditions })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Preview failed');
      setPreviewCount(data.matchedAudience);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/segments/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: segmentName,
          rules: conditions,
          createdBy: session?.user?.email
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Save failed');

      router.push('/campaigns');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 border rounded shadow-sm">
      <div className="mb-4">
        <label className="form-label">Segment Name</label>
        <input
          type="text"
          className="form-control"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          required
        />
      </div>

      {conditions.map((cond, idx) => (
        <div key={idx} className="row align-items-end mb-3">
          <div className="col-md-3">
            <label className="form-label">Field</label>
            <select
              className="form-select"
              value={cond.field}
              onChange={(e) => updateCondition(idx, 'field', e.target.value)}
              required
            >
              <option value="">Select Field</option>
              {fields.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Operator</label>
            <select
              className="form-select"
              value={cond.operator}
              onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
              required
            >
              <option value="">Select</option>
              {operators.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Value</label>
            <input
              type="text"
              className="form-control"
              value={cond.value}
              onChange={(e) => updateCondition(idx, 'value', e.target.value)}
              required
            />
          </div>

          {idx !== 0 && (
            <div className="col-md-2">
              <label className="form-label">Logic</label>
              <select
                className="form-select"
                value={cond.logic}
                onChange={(e) => updateCondition(idx, 'logic', e.target.value)}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </div>
          )}

          <div className="col-md-2 text-end">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeCondition(idx)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex gap-2 mt-3">
        <button type="button" className="btn btn-outline-primary" onClick={addCondition}>
          + Add Condition
        </button>
        <button type="submit" className="btn btn-success">Save Segment</button>
        <button type="button" className="btn btn-warning" onClick={handlePreview}>
          Preview Audience
        </button>
      </div>

      {isLoading && <p className="mt-3 text-info">Processing...</p>}
      {error && <p className="mt-3 text-danger">Error: {error}</p>}
      {previewCount !== null && !error && (
        <p className="mt-3 text-success">
          Matched Audience: <strong>{previewCount}</strong> users
        </p>
      )}
    </form>
  );
}


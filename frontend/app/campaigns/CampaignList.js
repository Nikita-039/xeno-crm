'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // ✅ Added import

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch('/api/segments/campaigns');
        const data = await res.json();
        setCampaigns(data);
        setFiltered(data);
      } catch (err) {
        setError('Failed to load campaigns');
      }
    };
    fetchCampaigns();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const results = campaigns.filter(c =>
      c.segmentId?.name?.toLowerCase().includes(term) ||
      c.segmentId?.createdBy?.toLowerCase().includes(term)
    );
    setFiltered(results);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await fetch(`/api/segments/campaigns/${id}`, { method: 'DELETE' });
      setFiltered(prev => prev.filter(c => c._id !== id));
      setCampaigns(prev => prev.filter(c => c._id !== id));
    } catch {
      alert('Failed to delete campaign.');
    }
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by segment or creator..."
        value={search}
        onChange={handleSearch}
      />

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Segment</th>
              <th>Created By</th>
              <th>Date</th>
              <th>Audience</th>
              <th>Sent</th>
              <th>Failed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c._id}>
                <td>{c.segmentId?.name || 'N/A'}</td>
                <td>{c.segmentId?.createdBy || 'N/A'}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>{c.audienceSize}</td>
                <td className="text-success">{c.sent}</td>
                <td className="text-danger">{c.failed}</td>
                <td className="d-flex flex-column gap-1">
                  <Link href={`/campaigns/${c._id}/logs`} className="btn btn-sm btn-outline-info">
                    View Logs
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p>No campaigns found.</p>}
      </div>
    </>
  );
}


'use client';
import { useEffect, useState } from 'react';

export default function CampaignLogTable({ campaignId }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/campaigns/${campaignId}/logs`);
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError('Failed to fetch logs');
      }
    };
    fetchLogs();
  }, [campaignId]);

  const statusBadge = (status) => {
    if (status === 'SENT') return <span className="badge bg-success">Sent</span>;
    if (status === 'FAILED') return <span className="badge bg-danger">Failed</span>;
    return <span className="badge bg-secondary">Pending</span>;
  };

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{log.customerId?.name || 'N/A'}</td>
              <td>{log.customerId?.email || 'N/A'}</td>
              <td>{statusBadge(log.status)}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

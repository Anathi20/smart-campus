import { MdLocalFireDepartment, MdBolt, MdInfo } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
        const res = await fetch(`${API}/api/alerts`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setAlerts(data);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load alerts');
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2>Alerts</h2>
      {error && <div style={{ color: 'crimson' }}>Error loading alerts: {error}</div>}
      {alerts === null && !error && <div>Loading alerts...</div>}
      {Array.isArray(alerts) && alerts.length === 0 && <div>No alerts.</div>}
      <ul style={{ marginTop: 24, padding: 0, listStyle: "none" }}>
        {Array.isArray(alerts) && alerts.map((a, i) => (
          <li key={a.id ?? i} style={{ background: "#f5f7fa", borderRadius: 8, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 600, fontSize: 16, display: "flex", alignItems: "center", gap: 8, color: '#000' }}>
              {a.type && a.type.toLowerCase().includes('fire') ? <MdLocalFireDepartment size={22} color="#e53935" /> : a.type && a.type.toLowerCase().includes('energy') ? <MdBolt size={22} color="#fbc02d" /> : <MdInfo size={22} color="#1976d2" />} {a.title ?? a.type}
            </div>
            <div style={{ marginTop: 4, color: '#000' }}>{a.message ?? a.message}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: '#000' }}>{a.time ?? a.time ?? ''}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


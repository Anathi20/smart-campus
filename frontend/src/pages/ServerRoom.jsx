export default function ServerRoom({ serverRoom = { temperature: 0, status: "Checking...", overheating: false } }) {
  const getTemperatureColor = (temp) => {
    if (temp > 75) return "#ff4444";
    if (temp > 65) return "#ff8800";
    return "#00aa00";
  };

  const getStatusColor = (status) => {
    if (status === "OVERHEATING") return "#ff4444";
    if (status === "WARNING") return "#ff8800";
    return "#00aa00";
  };

  return (
    <div>
      <h2>Server Room Monitoring</h2>
      
      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Current Temperature:</div>
        <div style={{
          padding: 12,
          borderRadius: 12,
          color: "white",
          display: "inline-block",
          background: getTemperatureColor(serverRoom.temperature),
          fontWeight: 600,
          fontSize: 18,
        }}>
          {serverRoom.temperature}°C
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Status:</div>
        <div style={{
          padding: 12,
          borderRadius: 12,
          color: "white",
          display: "inline-block",
          background: getStatusColor(serverRoom.status),
          fontWeight: 600,
          fontSize: 18,
        }}>
          {serverRoom.status}
        </div>
      </div>

      {serverRoom.overheating && (
        <div style={{ 
          marginTop: 16, 
          padding: 16, 
          background: "#ff4444", 
          color: "white", 
          borderRadius: 8,
          fontWeight: 600 
        }}>
          ⚠️ ALERT: Server room is overheating! Immediate action required!
        </div>
      )}

      <div style={{ marginTop: 8, fontSize: 14, color: "#555" }}>
        {serverRoom.last_checked ? `Last checked: ${serverRoom.last_checked}` : ""}
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>Temperature Guidelines:</h3>
        <ul style={{ marginTop: 8, color: "#555" }}>
          <li>Normal: Below 65°C (Green)</li>
          <li>Warning: 65-75°C (Orange)</li>
          <li>Critical: Above 75°C (Red)</li>
        </ul>
      </div>
    </div>
  );
}

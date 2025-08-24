export default function Cafeteria({ fire = { status: "Checking..." }, gas = { status: "Checking..." } }) {
  return (
    <div>
      <h2>Cafeteria</h2>
      
      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Fire Status:</div>
        <div style={{
          padding: 12,
          borderRadius: 12,
          color: "white",
          display: "inline-block",
          background: fire.status === "SAFE" ? "green" : "red",
          fontWeight: 600,
          fontSize: 18,
        }}>
          {fire.status}
        </div>
        <div style={{ marginTop: 8, fontSize: 14, color: "#555" }}>
          {fire.last_checked ? `Last checked: ${fire.last_checked}` : ""}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Gas Leak Detection:</div>
        <div style={{
          padding: 12,
          borderRadius: 12,
          color: "white",
          display: "inline-block",
          background: gas.status === "SAFE" ? "green" : gas.status === "DETECTED" ? "red" : "#ff8800",
          fontWeight: 600,
          fontSize: 18,
        }}>
          {gas.status}
        </div>
        {gas.status === "DETECTED" && (
          <div style={{ 
            marginTop: 8, 
            padding: 8, 
            background: "#ff4444", 
            color: "white", 
            borderRadius: 4,
            fontWeight: 600 
          }}>
            ⚠️ EVACUATE IMMEDIATELY - Gas leak detected!
          </div>
        )}
        <div style={{ marginTop: 8, fontSize: 14, color: "#555" }}>
          {gas.last_checked ? `Last checked: ${gas.last_checked}` : ""}
        </div>
      </div>
    </div>
  );
}

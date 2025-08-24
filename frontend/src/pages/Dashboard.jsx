import { MdMeetingRoom, MdPeople, MdLightbulb, MdLocalFireDepartment } from "react-icons/md";

export default function Dashboard({ rooms, fire }) {
  // Summary calculations
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === "Occupied").length;
  const lightsOn = rooms.filter(r => r.lights === "ON").length;

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Smart Campus Dashboard</h1>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1, background: "#23284a", color: "#fff", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <MdMeetingRoom size={36} style={{ marginRight: 16 }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Total Rooms</div>
            <div style={{ fontSize: 24 }}>{totalRooms}</div>
          </div>
        </div>
        <div style={{ flex: 1, background: "#23284a", color: "#fff", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <MdPeople size={36} style={{ marginRight: 16 }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Occupied Rooms</div>
            <div style={{ fontSize: 24 }}>{occupiedRooms}</div>
          </div>
        </div>
        <div style={{ flex: 1, background: "#23284a", color: "#fff", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <MdLightbulb size={36} style={{ marginRight: 16 }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Lights ON</div>
            <div style={{ fontSize: 24 }}>{lightsOn}</div>
          </div>
        </div>
        <div style={{ flex: 1, background: fire.status === "SAFE" ? "green" : "red", color: "#fff", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <MdLocalFireDepartment size={36} style={{ marginRight: 16 }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Fire Status</div>
            <div style={{ fontSize: 24 }}>{fire.status}</div>
            <div style={{ fontSize: 12 }}>{fire.last_checked ? `Last checked: ${fire.last_checked}` : ""}</div>
          </div>
        </div>
      </div>

      {/* Cafeteria Fire Status */}
      <section style={{ marginBottom: 32 }}>
        <h2>Cafeteria Fire Status</h2>
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            color: "white",
            display: "inline-block",
            background: fire.status === "SAFE" ? "green" : "red",
            fontWeight: 600,
            fontSize: 18,
            marginTop: 8,
          }}
        >
          {fire.status} {fire.last_checked ? `• ${fire.last_checked}` : ""}
        </div>
      </section>

      {/* Rooms List */}
      <section>
        <h2>Rooms</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {rooms.map((r, i) => (
            <div key={i} style={{ background: "#f5f7fa", borderRadius: 10, padding: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, color: '#000' }}>{r.room}</div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>Status:</span> {r.status === "Occupied" ? <span style={{ color: "green", fontWeight: 600 }}>Occupied</span> : <span style={{ color: "#888" }}>Unoccupied</span>}
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>Lights:</span> {r.lights === "ON" ? <span style={{ color: "gold", fontWeight: 600 }}>ON</span> : <span style={{ color: "#888" }}>OFF</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { MdMeetingRoom, MdLightbulb } from "react-icons/md";

export default function Rooms({ rooms = [] }) {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Rooms</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {rooms.map((r, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", padding: 20, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <MdMeetingRoom size={28} color="#23284a" />
              <span style={{ fontWeight: 700, fontSize: 20, color: "#000" }}>{r.room}</span>
            </div>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 500 }}>Status:</span> {r.status === "Occupied" ? <span style={{ color: "green", fontWeight: 600 }}>Occupied</span> : <span style={{ color: "#888" }}>Unoccupied</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 500 }}>Lights:</span> <MdLightbulb size={20} color={r.lights === "ON" ? "gold" : "#888"} /> {r.lights === "ON" ? <span style={{ color: "gold", fontWeight: 600 }}>ON</span> : <span style={{ color: "#888" }}>OFF</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

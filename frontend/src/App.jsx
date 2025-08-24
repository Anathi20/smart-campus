import { useEffect, useState } from "react";

// Stable API base for all fetches (read once from Vite env)
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
import { MdDashboard, MdMeetingRoom, MdRestaurant, MdBolt, MdNotifications, MdSettings, MdComputer } from "react-icons/md";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Cafeteria from "./pages/Cafeteria";
import EnergyUsage from "./pages/EnergyUsage";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import ServerRoom from "./pages/ServerRoom";

export default function App() {
  // Use Vite env variable for API base so we can point the frontend
  // at a LAN address or a public tunnel during demos.
  // use module-level API_BASE directly to keep the value stable for hooks
  const [rooms, setRooms] = useState([]);
  const [fire, setFire] = useState({ status: "Checking..." });
  const [gas, setGas] = useState({ status: "Checking..." });
  const [serverRoom, setServerRoom] = useState({ temperature: 0, status: "Checking...", overheating: false });
  const [page, setPage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  const load = async () => {
      try {
  const r = await fetch(`${API_BASE}/api/rooms`).then(x=>x.json());
  const f = await fetch(`${API_BASE}/api/cafeteria/fire`).then(x=>x.json());
  const g = await fetch(`${API_BASE}/api/cafeteria/gas`).then(x=>x.json());
  const s = await fetch(`${API_BASE}/api/serverroom`).then(x=>x.json());
        setRooms(r);
        setFire(f);
        setGas(g);
        setServerRoom(s);
      } catch {
        // Optionally handle error here
      }
    };
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="main-layout" style={{ 
      display: "flex", 
      height: "100vh",
      backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000"
    }}>
      {/* Topbar for small screens */}
      <div className="topbar" style={{ display: 'none' }}>
        <button className="hamburger" onClick={() => setSidebarOpen(s => !s)} aria-label="Toggle menu">☰</button>
        <div style={{ fontWeight: 700 }}>Smart Campus</div>
        <div style={{ width: 36 }} />
      </div>
      {/* Side Navigation Panel */}
      <nav className={`side-nav ${sidebarOpen ? 'open' : ''}`} style={{ 
        width: 240, 
        minHeight: "100vh",
        backgroundColor: darkMode ? "#2d2d2d" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000"
      }}>
        <div style={{ 
          fontWeight: 700, 
          fontSize: 22, 
          padding: "32px 0 24px 0", 
          textAlign: "center", 
          borderBottom: `1px solid ${darkMode ? "#404040" : "#23284a"}`,
          color: darkMode ? "#ffffff" : "#000000"
        }}>
          Smart Campus
        </div>
        <ul style={{ listStyle: "none", padding: "0", margin: "0", flex: 1 }}>
          {[
            { label: "Dashboard", icon: <MdDashboard size={22} />, key: "Dashboard" },
            { label: "Rooms", icon: <MdMeetingRoom size={22} />, key: "Rooms" },
            { label: "Cafeteria", icon: <MdRestaurant size={22} />, key: "Cafeteria" },
            { label: "Server Room", icon: <MdComputer size={22} />, key: "ServerRoom" },
            { label: "Energy Usage", icon: <MdBolt size={22} />, key: "EnergyUsage" },
            { label: "Alerts", icon: <MdNotifications size={22} />, key: "Alerts" },
            { label: "Settings", icon: <MdSettings size={22} />, key: "Settings" },
          ].map(item => (
            <li
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                padding: "16px 32px",
                cursor: "pointer",
                background: page === item.key 
                  ? (darkMode ? "#404040" : "#23284a") 
                  : "none",
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontWeight: page === item.key ? 700 : 500,
                transition: "background 0.2s",
                borderLeft: page === item.key ? "4px solid #4f8cff" : "4px solid transparent",
                color: darkMode ? "#ffffff" : "#000000"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = darkMode ? "#404040" : "#23284a")}
              onMouseLeave={e => (e.currentTarget.style.background = page === item.key ? (darkMode ? "#404040" : "#23284a") : "none")}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
        <div style={{ padding: "24px 32px", borderTop: "1px solid #23284a", fontSize: 13, color: "#aaa", textAlign: "center" }}>
          &copy; {new Date().getFullYear()} Smart Campus
        </div>
      </nav>

      {/* Main Content with Header Bar */}
      <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ height: 64, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", padding: "0 32px", fontWeight: 600, fontSize: 18, letterSpacing: 1, color: "#23284a" }}>
          Welcome to Smart Campus Dashboard
        </header>
        <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
         
          {page === "Dashboard" && <Dashboard rooms={rooms} fire={fire} />}
          {page === "Rooms" && <Rooms rooms={rooms} />}
          {page === "Cafeteria" && <Cafeteria fire={fire} gas={gas} />}
          {page === "ServerRoom" && <ServerRoom serverRoom={serverRoom} />}
          {page === "EnergyUsage" && <EnergyUsage />}
          {page === "Alerts" && <Alerts />}
          {page === "Settings" && <Settings darkMode={darkMode} setDarkMode={setDarkMode} />}
        </main>
      </div>
    </div>
  );
}

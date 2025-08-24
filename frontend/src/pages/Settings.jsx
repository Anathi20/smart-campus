export default function Settings({ darkMode, setDarkMode }) {
  return (
    <div>
      <h2>Settings</h2>
      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600 }}>
            <input 
              type="checkbox" 
              style={{ marginRight: 8 }} 
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            Dark mode
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600 }}>
            <input type="checkbox" style={{ marginRight: 8 }} defaultChecked />
            Auto-refresh data
          </label>
        </div>
      </div>
    </div>
  );
}

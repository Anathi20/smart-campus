export default function EnergyUsage() {
  // Dummy data for demonstration
  const usage = [0.5, 0.45, 0.42, 0.4, 0.38, 0.36, 0.35];

  return (
    <div>
      <h2>Energy Usage</h2>
      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Total energy saved:</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#23284a" }}>0.375 kWh</div>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Usage Chart (sample)</div>
          <svg width="100%" height="120" viewBox="0 0 200 120">
            <polyline
              fill="none"
              stroke="#23284a"
              strokeWidth="3"
              points={usage.map((u, i) => `${20 + i * 30},${100 - u * 100}`).join(" ")}
            />
            {usage.map((u, i) => (
              <circle key={i} cx={20 + i * 30} cy={100 - u * 100} r={4} fill="#23284a" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

import { GradeCalculator } from "./components/GradeCalculator";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: "100%", maxWidth: 430 }}>
        <GradeCalculator />
      </div>
    </div>
  );
}

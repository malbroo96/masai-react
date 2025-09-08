import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Profile Cards</h1>

      {/* Example 1: With all props */}
      <ProfileCard
        name="Akhil Joseph"
        age={29}
        bio="I am a passionate developer who loves exploring JavaScript, React, and building cool projects that solve real-world problems. Currently learning more about front-end frameworks and state management."
      />

      {/* Example 2: Missing bio (will use default) */}
      <ProfileCard name="John Doe" age={35} />

      {/* Example 3: No props at all (uses all defaults) */}
      <ProfileCard />
    </div>
  );
}

export default App;

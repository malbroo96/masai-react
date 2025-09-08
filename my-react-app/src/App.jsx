import "./App.css";
import Counter from "./assignments/Counter.jsx";
import ToggleButton from "./assignments/ToggleButton.jsx";
import ProfileCard from "./assignments/ProfileCard.jsx";
import AutoCorrectApp from "./AutoCorrectApp";
import DailyQuote from "./DailyQuote";
import UserProfiles from "./UserProfiles";
import Stopwatch from "./Stopwatch";


function App() {
  return (
    <div>
      <div>
        {" "}
        Question1: <Counter initialValue={4} />
      </div>
      <div>
        Question2:
        <h1>Toggle Example</h1>
        {/* Without label */}
        <ToggleButton />
        {/* With label (Bonus) */}
        <ToggleButton label="Light Switch" />
      </div>
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
       <div>
      <AutoCorrectApp />
    </div>
     <div>
      <ThemeApp />
    </div>
    <div>
      <DailyQuote />
    </div>
     <div>
      <UserProfiles />
    </div>
     <div>
      <Stopwatch />
    </div>
    </div>
  );
}

export default App;

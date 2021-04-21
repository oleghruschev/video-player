import React from "react";
import Player from "./features/player/Player";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video player</h1>
      </header>
      <main>
        <Player />
      </main>
    </div>
  );
}

export default App;

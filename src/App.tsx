import React from "react";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="pokemon-searcher-title">Pokemon Searcher</h1>
      <Router />
    </div>
  );
};

export default App;

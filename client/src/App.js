import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [repos, setRepos] = useState(null);
  useEffect(() => {
    // fetch repos
    const fetchRepos = async () => {
      const res = await fetch("http://localhost:9000/", {
        method: "GET",
      });

      const JSONResponse = await res.json();
      console.log(JSONResponse.repos);
      setRepos(JSONResponse.repos);
    };

    fetchRepos();
  }, []);

  const reposList = !repos ? (
    <p>Loading repos...</p>
  ) : (
    <ul>
      {repos.map((r) => {
        return <p key={r.id}>{r.name}</p>;
      })}
    </ul>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h2>Github repos:</h2>
      </header>

      {reposList}
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    <Router>
      <nav>
        <ul>
          <li>
            <Link to ="/">Home</Link>
          </li>
        </ul>
      </nav>
    </Router>
      </header>
    </div>
  );
}

export default App;

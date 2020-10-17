import React from 'react';
import './App.css';
import SearchMovies from './searchMovie'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
        <SearchMovies />
      </header>
    </div>
  );
}

export default App;

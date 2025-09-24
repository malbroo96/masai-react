import React from 'react';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div>
      <h1>Optimized Map App</h1>
      <SearchBar />
      <MapContainer />
    </div>
  );
}

export default App;

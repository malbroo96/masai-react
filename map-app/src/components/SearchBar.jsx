import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setDestination } from '../features/locationSlice';

const SearchBar = React.memo(() => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSearch = useCallback(() => {
    if (input) dispatch(setDestination(input));
  }, [input, dispatch]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter destination"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
});

export default SearchBar;

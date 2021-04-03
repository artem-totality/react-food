import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Search({ cb = Function.prototype }) {
  const [value, setValue] = useState('');

  const { search } = useLocation();

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    cb(value.toLowerCase());
  };

  useEffect(() => {
    if (search) {
      setValue(search.split('=')[1].toLowerCase());
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          type="search"
          id="search-field"
          placeholder="search"
          onKeyDown={handleOnKeyDown}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button
          className="btn"
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;

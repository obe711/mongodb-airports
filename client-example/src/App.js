import React from 'react';
import './App.css';
import {
  searchSubject,
  useObservable,
  searchResultObservables,
} from "./airport.service";

function App() {
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const inputSelectRef = React.useRef();
  useObservable(searchResultObservables, setResults);

  React.useEffect(() => {
    if (isEdit) inputSelectRef.current.focus();
  }, [isEdit]);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    if (searchText) {
      setShowOptions(true);
      searchSubject.next(searchText);
    } else {
      setShowOptions(false);
    }
  };

  const handleOnClick = (e) => {
    setValue(e.currentTarget.id);
    setShowOptions(false);
    setIsEdit(false);
    setSearch("");
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="">
          {!isEdit && (
            <input
              placeholder="From"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              onClick={() => setIsEdit(true)}
            />
          )}
          {isEdit && (
            <input
              placeholder="From"
              onChange={handleChange}
              value={search}
              ref={inputSelectRef}
            />
          )}

          {showOptions &&
            [...results].map((airport) => (
              <div
                key={airport.iata}
                id={airport.iata}
                onClick={handleOnClick}
              >{`${airport.name}, ${airport.city} (${airport.iata})`}</div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;

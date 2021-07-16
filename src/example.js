import React from "react";
import { BehaviorSubject, from } from "rxjs";
import {
  mergeMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";

const getAirports = async (searchString) => {
  const { results: airports } = await fetch(
    `/my-api?search=${searchString}`
  ).then((res) => res.json());
  return airports;
};

let searchSubject = new BehaviorSubject("");

let searchResultObservables = searchSubject.pipe(
  filter((val) => val.length > 0),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap((val) => from(getAirports(val)))
);

const useObservable = (observable, setter) => {
  React.useEffect(() => {
    let subscription = observable.subscribe((result) => {
      setter(result.data);
    });
    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

const AirportAutoCompleteInput = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const inputSelectRef = React.useRef();
  useObservable(searchResultObservables, setResults);

  React.useEffect(() => {
    if (isEdit) {
      inputSelectRef.current.focus();
    }
  }, [isEdit]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    if (newValue) {
      setShowOptions(true);
      searchSubject.next(newValue ? newValue : " ");
    } else {
      setShowOptions(false);
    }
  };

  const handleOnClick = (e) => {
    setValue(e.currentTarget.id);
    setSearch("");
    setShowOptions(false);
    setIsEdit(false);
  };

  return (
    <div className="">
      {!isEdit && (
        <input
          placeholder="From"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          onClick={() => setIsEdit(true)}
        />
      )}
      {isEdit && (
        <input
          ref={inputSelectRef}
          onChange={handleChange}
          value={search}
          placeholder="From"
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
  );
};

export default AirportAutoCompleteInput;
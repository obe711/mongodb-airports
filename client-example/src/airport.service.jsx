import React from "react";
import { BehaviorSubject, from } from "rxjs";
import {
  mergeMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";

export let searchSubject = new BehaviorSubject("");

export let searchResultObservables = searchSubject.pipe(
  filter((val) => val.length > 0),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap((val) => from(getAirports(val)))
);

export const useObservable = (observable, setter) => {
  React.useEffect(() => {
    let subscription = observable.subscribe((result) => {
      setter(result.data);
    });
    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

export const getAirports = async (searchString) => {
  const { results: airports } = await fetch(`/api?s=${searchString}`).then(
    (res) => res.json()
  );

  return airports;
};

const airportService = {
  searchSubject,
  useObservable,
  searchResultObservables,
};

export default airportService;

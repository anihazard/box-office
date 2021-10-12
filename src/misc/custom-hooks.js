import { useReducer, useEffect } from 'react';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  // custom wrapper-hook for useReducer
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial; // so that the value persists even after reloading the page
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state)); // everytime state changes the new id gets added to the state
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  // a wrapper around usePersistedReducer
  return usePersistedReducer(showsReducer, [], key);
}

import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

const Data = ({ initialState, reducer, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useData = () => useContext(StateContext);

export default Data;

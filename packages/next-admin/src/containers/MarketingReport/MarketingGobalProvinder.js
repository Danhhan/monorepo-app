import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from './reducers';
import { marketerData, marketerTotalList } from './context/useMarketingReducer';

const localState = JSON.parse(localStorage.getItem('datamkt'));
const initialState = {
  dataMakter: [],
  marketerTotal: [],
};
export const GlobalContext = createContext(localState || initialState);
export const appReducers = combineReducers({
  marketerData,
  totalList: marketerTotalList,
});

const MarketingGobalProvinder = ({ children }) => {
  const [state, dispatch] = useReducer(appReducers, localState || initialState);
  console.log(state);
  MarketingGobalProvinder.propTypes = {
    children: PropTypes.oneOfType(PropTypes.array),
  };

  MarketingGobalProvinder.defaultProps = {
    children: {},
  };

  function addList(list) {
    dispatch({
      type: 'ADD_LIST',
      payload: list,
    });
  }
  function getList(list) {
    // console.log(list);
    dispatch({
      type: 'GET_LIST_TOTAL',
      payload: { list },
    });
  }
  function removeListiTem(item) {
    dispatch({
      type: 'DELETE_LIST',
      payload: { item },
    });
  }
  // const merge3 = state.dataMakter
  //   ? [...new Set([].concat(...state.dataMakter))]
  //   : [];

  // useEffect(() => {
  //   localStorage.setItem('datamkt', JSON.stringify(state));
  // }, [state, merge3]);

  const dt = state.dataMakter ? state.dataMakter : [];
  // const filter = dt.map(it => console.log(it.label));
  return (
    <GlobalContext.Provider
      value={{
        dataMakter: state.dataMakter,
        marketerTotal: state.marketerTotal,
        addList,
        removeListiTem,
        getList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default MarketingGobalProvinder;

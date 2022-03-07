export const marketerData = (state, action) => {
  switch (action.type) {
    case 'GET_LIST': {
      const act = action.payload;

      return {
        dataMakter: act,
      };
    }
    case 'ADD_LIST': {
      const act = action.payload;
      // const merge3 = [...new Set([].concat(...state.dataMakter))];

      return {
        ...state,
        dataMakter: [...state.dataMakter, act],
      };
    }

    case 'DELETE_LIST': {
      const merge3 = [...new Set([].concat(...state.dataMakter))];

      const newLists = state.dataMakter
        ? merge3.filter(it => it.label !== action.payload.item)
        : [];
      //   console.log(newLists);
      return { dataMakter: newLists };
    }
    default:
      return state;
  }
};
export const marketerTotalList = (state, action) => {
  switch (action.type) {
    case 'GET_LIST_TOTAL': {
      const act = action.payload;

      return {
        marketerTotal: act,
      };
    }

    default:
      return state;
  }
};

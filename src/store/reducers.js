import { combineReducers } from "redux";

const initialCoinState = {
  allCoins: [],
  selectedPairs: [
    {label: 'ANON / BURST', data: 27.64},
    {label: 'BTC / LTC', data: 124.94 }
  ]
};

const initialLoadingState = {
  loading: false
}
// This is the thing setting the state and moving things around!

// This will reduce all the coins.
export function coinReducer(state = initialCoinState, action) {
  switch (action.type) {
    case('FETCH_ALL_COINS'):
      const data = action.payload['Data'];
      const coinCollection = Object.keys(data).map(k => {
        return data[k]
      });
      const sortedCollected = coinCollection.sort((a, b) => {
        if(a.CoinName < b.CoinName) { return -1; }
        if(a.CoinName > b.CoinName) { return 1; }
        return 0;
      })
      // Filter those that aren't trading
      sortedCollected.filter(v => v.IsTrading === true);
      return {
        ...state,
        allCoins: sortedCollected,
      }
    case('SET_PAIR'):
      // Find the data about the coins from the state?
      const pairObj = {
        label: action.payload.cur1 + ' / ' + action.payload.cur2,
        data: action.payload.data[action.payload.cur2]
      }
      return {
        ...state,
        selectedPairs: [...state.selectedPairs, pairObj]
      }
    // case('PAIR_ERROR'):
    //   return {
    //     ...state,
    //     pairError: action.payload
    //   }
    case('REMOVE_PAIR'):
      const index = action.payload;
      let tempPairs = [...state.selectedPairs];
      tempPairs.splice(index, 1);
      return {
        ...state,
        selectedPairs: tempPairs
      }
    default: 
      return state;  
  }
}

export function loadingReducer(state = initialLoadingState, action) {
  switch(action.type) {
    case('LOADING_CHANGE'):
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}

const combinedReducer = combineReducers({coinReducer, loadingReducer});

export default combinedReducer;

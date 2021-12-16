import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  DefaultRoute: 'HOME'
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.OPEN_CHAT:
            return {...state, user: action.value};
        case actionTypes.SET_DEFAULT_ROUTE: 
            return {...state, DefaultRoute: 'CHATS'}
        default: return state
    }
};

export default reducer;
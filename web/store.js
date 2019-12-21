import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';



const app = (state = {state: "LOADING"}, action) => {
  if(action.type === "APP_SIGN_IN"){
    
    var d = new Date();
    let exdays = 30
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "token=" + action.data.token + ";" + expires + ";path=/";
    
    

      return {...state, ...action.data};
  } else if(action.type === "APP_SIGN_OUT"){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      return {state: "RUNNING"};
  } else if(action.type === "VALIDATE_TOKEN_SUCCESS"){

      return {...state, ...action.data, state: "RUNNING"};
  } else if(action.type === "VALIDATE_TOKEN_ERROR"){

      return {...state, state: "RUNNING"};
  } else if(action.type === "STATE_RUNNING"){

      return {...state, state: "RUNNING"};
  } 
  
  return state;
}


export function initializeStore (initialState) {
  return createStore(
    combineReducers({ app }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}

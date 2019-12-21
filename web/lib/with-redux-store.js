import React from 'react'
import { initializeStore } from '../store'
import cookies from 'next-cookies'
import fetchPromise from '../utils/fetchPromise';

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  
  if (isServer) {
    return initializeStore(initialState)
    //return initializeStore({app: {state: "LOADING", token: req.cookies.token}, reducer: {count: 0}})
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      
      
      //const {user, token } = appContext.ctx.query //Ahora se consultan en esta sección
      let user, token;
      const { token: cookieToken } = cookies(appContext.ctx)
      //console.log("Token: "+ cookieToken)
      if(isServer && cookieToken){
        try {
          const response = await fetchPromise("/api/auth/token", {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${cookieToken}`}
          })
          if(!response.error){
            user = response.user;
            token = response.token
          }
        } catch(err){
          console.log("Error token ", err)
        }
      }
      
      let store = getOrCreateStore({app: {user, token}})
      
      
      
      // Provide the store to getInitialProps of pages
      appContext.ctx.store = store
      

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: store.getState()
      }
    }

    constructor (props) {
      super(props)
      this.store = getOrCreateStore(props.initialReduxState)
    }

    render () {
      return <App {...this.props} store={this.store} />
    }
  }
}

import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { toast, ToastContainer} from 'react-toastify';

class MyApp extends App {
  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <ToastContainer/>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)

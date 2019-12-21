import store from '../store'
import { getIP } from './constants'
import fetch from 'isomorphic-unfetch'


export default function appFetch(url, options) {
	
	console.log("appFetch")
	if (!options) options = {}
	if (options.token) {
		options.headers = { ...options.headers, 'Authorization': `Bearer ${options.token}` }
		delete options.token
	} else if(process.browser){
		let state = window["__NEXT_REDUX_STORE__"].getState();
		if (state.app.token) {
			options.headers = { ...options.headers, 'Authorization': `Bearer ${state.app.token}` }
		}
	}
	

	console.log(getIP() + url, options)
	return new Promise((resolve, reject) => {
		fetch(getIP() + url, options).then(response => {
			//console.log(response)
			// if (!response.ok) {
			// 	return Promise.reject({code: 404, message: "Se ha producido un error de conexión"});
			// }
			return response.json();
		}).then(response => {
			resolve(response)

		}).catch(error => {
			reject(error)


		});
	})

}

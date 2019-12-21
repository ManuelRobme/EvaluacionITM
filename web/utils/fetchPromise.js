import store from '../store'
import {getIP} from './constants'
import fetch from 'isomorphic-unfetch';

export default function fetchPromise(url, options) {

	
    return new Promise((resolve, reject) => {
		fetch(getIP()+url, options).then(response => {
			//console.log(response)
			if (!response.ok) {
				return Promise.reject({code: 404, message: "Se ha producido un error de conexión"});
			}
			return response.json();
		  }).then(response => {
			resolve(response)
			
		  }).catch(error => {
			reject(error)
			
			
		  }); 
	})
     
}

const appSignOut = (data) => {
    return {
        type: "APP_SIGN_OUT",
        data: data
    }
}

const validateTokenAction = (data) => {
    return {
        type: "VALIDATE_TOKEN_SUCCESS",
        data: data
    }
}


const validateTokenErrorAction = () => {
    return {
        type: "VALIDATE_TOKEN_ERROR"

    }
}




const signIn = (data) => {

    return {
        type: "APP_SIGN_IN",
        data: data
    }
    

}



const signOut = () => {
    
    return(appSignOut())

}

const validateToken = (token) => {
    return (dispatch) => {
        appFetch("/api/auth/token", {
            method: 'POST',
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(response => {
            if(!response.error){
                //history.push("/inicio")
                dispatch(validateTokenAction(response))
            } else {
                history.push("/login")
                dispatch(validateTokenErrorAction())
            }
            
            console.log(response)
            
        }).catch(error => {
            console.log(error)
            history.push("/login")
            dispatch(validateTokenErrorAction())
            
        }); 
    }
}

const stateRunning = () => {
    return {
        type: "STATE_RUNNING"

    }
}


export { signIn, signOut, validateToken, stateRunning };


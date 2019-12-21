
exports.getIP = () => {
    if(process.env.NODE_ENV === 'production'){
        return "https://on-app-f801f.appspot.com";
    } else {
        return "http://localhost:5000";
    }
}

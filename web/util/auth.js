import cookies from 'next-cookies'
import Router from 'next/router';
export const auth = ctx => {
    const {token} = cookies(ctx);

    if(ctx.req && !token && !ctx.store.getState().app.user){
        ctx.res.writeHead(302, {Community: '/login'})
        ctx.res.end()
        return
    } else if(!token && !ctx.store.getState().app.user){
        Router.push("/login")
    }
    return token
}
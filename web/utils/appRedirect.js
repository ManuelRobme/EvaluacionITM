import Router from 'next/router'
export default function appRedirect(ctx, location) {
    if(ctx.req){
        ctx.res.writeHead(302, {Location: location})
        ctx.res.end()

    } else {
        Router.push(location)
    }
    return {}
}
export default function guest({next,store}){
    let isLoggedIn = false // Can be calculated through store
    if(isLoggedIn){
        return next({
            name: 'home'
        })
    }
 
    return next();
 }
 
import moment from "moment";

export function storeJWT(responseData){

    const expiration = moment().add(responseData.expiresIn.split(" ")[0], responseData.expiresIn.split(" ")[1]);

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("expiration", JSON.stringify(expiration.valueOf()));
}

export function logOut(){

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
}

export function tokenExpiresIn(){       
    return moment(JSON.parse(localStorage.getItem("expiration"))).fromNow();
}

export function isLoggedIn(){
    return moment().isBefore(JSON.parse(localStorage.getItem("expiration")));
}
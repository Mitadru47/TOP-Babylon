import moment from "moment";

export function storeJWT(responseData){

    const expiration = moment().add(responseData.expiresIn.split(" ")[0], responseData.expiresIn.split(" ")[1]);

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("expiration", expiration);
}
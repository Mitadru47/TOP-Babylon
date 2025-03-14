import axios from "axios";

import { BABYLON_SERVER_URL } from "./constants";
import { isLoggedIn } from "./auth";

axios.interceptors.request
    .use((interceptedRequest) => {

        interceptedRequest.mode = "cors";

        interceptedRequest.headers["Content-Type"] = "application/json";

        if(isLoggedIn())
            interceptedRequest.headers["Authorization"] = localStorage.getItem("token");

        interceptedRequest.baseURL = BABYLON_SERVER_URL;

        return interceptedRequest;

    }, (error) => console.log(error));

export default axios;
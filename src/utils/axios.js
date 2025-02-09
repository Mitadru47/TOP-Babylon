import axios from "axios";
import { BABYLON_SERVER_URL } from "../utils/urls";

axios.interceptors.request
    .use((interceptedRequest) => {

        interceptedRequest.mode = "cors";

        interceptedRequest.headers["Content-Type"] = "application/json";
        interceptedRequest.headers["Authorization"] = "";

        interceptedRequest.baseURL = BABYLON_SERVER_URL;

        return interceptedRequest;

    }, (error) => console.log(error));

export default axios;
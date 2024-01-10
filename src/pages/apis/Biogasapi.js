import axios from "axios";

export default axios.create({
    baseURL : "http://172.105.33.238:3500/api/v1"
});

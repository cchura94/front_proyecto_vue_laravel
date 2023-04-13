import axios from "axios";

const url_servidor = "http://127.0.0.1:8000/api";

export const http = () => {

    const token = "ABCXYZ*****oeirgr98gyrg8vg8engv8y*"
    const interceptor = axios.create({
        baseURL: url_servidor,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });


    return interceptor;
}
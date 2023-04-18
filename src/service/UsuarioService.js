import { http } from "./HttpAxios"

export default {
    indexUsuario: () => {
        return http().get("/user");
    },
    storeUsuario: (datos) =>{
        return http().post("/user", datos);
    },
    showUsuario: (id) => {
        return http().get(`/user/${id}`);        
    },
    updateUsuario: (id, datos) => {
        return http().put(`/user/${id}`, datos);
    },
    destroyUsuario: (id) => {
        return http().delete(`/user/${id}`); 
    }
}
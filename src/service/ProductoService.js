import { http } from "./HttpAxios"

export default {
    listar(){
        return http().get("/producto");
    },
    guardar: (datos) => {
        return http().post("/producto", datos);
    },
    mostrar: function(id){
        return http().get(`/producto/${id}`)
    },
    modificar: (datos, id) => {
        return http().put(`/producto/${id}`, datos)
    },
    eliminar: (id) => {
        return http().delete(`/producto/${id}`)
    }
}
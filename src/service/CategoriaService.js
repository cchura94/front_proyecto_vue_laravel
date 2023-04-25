import { http } from "./HttpAxios"

export default {
    listar(){
        return http().get("/categoria");
    },
    guardar: (datos) => {
        return http().post("/categoria", datos);
    },
    mostrar: function(id){
        return http().get(`/categoria/${id}`)
    },
    modificar: (datos, id) => {
        return http().put(`/categoria/${id}`, datos)
    },
    eliminar: (id) => {
        return http().delete(`/categoria/${id}`)
    }
}
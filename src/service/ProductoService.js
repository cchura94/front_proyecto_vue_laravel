import { http } from "./HttpAxios"

export default {
    listar(page=1, limit=5){
        return http().get(`/producto?page=${page}&q=&limit=${limit}`);
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
    },
    actualizarImagen: (id, formData) => {
        return http().post(`/producto/${id}/update-image`, formData)
    }
}
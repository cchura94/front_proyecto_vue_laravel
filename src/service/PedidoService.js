import { http } from "./HttpAxios"

export default {
    listar(page=1, limit=5){
        return http().get(`/pedido?page=${page}&q=&limit=${limit}`);
    },
    guardar: (datos) => {
        return http().post("/pedido", datos);
    },
    mostrar: function(id){
        return http().get(`/pedido/${id}`)
    },
    modificar: (datos, id) => {
        return http().put(`/pedido/${id}`, datos)
    },
    eliminar: (id) => {
        return http().delete(`/pedido/${id}`)
    },
    nuevoCliente: (datos) => {
        return http().post(`/cliente`, datos)
    },
    buscarCliente: (q) => {
        return http().get(`/cliente?q=${q}`)
    },
    enviarCorreo: (id) => {
        return http().get(`/pedido/${id}/enviar-email`);
    }
    
}
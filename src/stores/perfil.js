import { defineStore } from "pinia"
import { ref } from "vue"

export const usePerfilStore = defineStore('perfil', () => {
    
    const usuario = ref({});


    const cargarPerfilUsuario = (user) => {
        usuario.value = user
    }

    return {usuario, cargarPerfilUsuario}
})
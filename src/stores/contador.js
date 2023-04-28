import { defineStore } from "pinia"
import { ref } from "vue"

export const useContadorStore = defineStore('contador', () => {
    const contador = ref(0);
    const titulo = ref('Contador')

    const aumentar = () => {
        contador.value++;
    }

    return { contador, titulo, aumentar }
})
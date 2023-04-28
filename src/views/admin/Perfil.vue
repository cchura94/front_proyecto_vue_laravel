<template>
    <div class="card">
        <div v-if="perfil">
            <h1>Perfil</h1>
            <h2>ID: {{ perfil.id }}</h2>
            <h2>NOMBRE: {{ perfil.name }}</h2>
            <h2>CORREO: {{ perfil.email }}</h2>
        </div>
        <div v-else>
            <h1>Cargando...</h1>
        </div>

        <h3>{{ store.titulo }}: {{ store.contador }}</h3>
        <button @click="store.aumentar">+</button>
        <button>-</button>
        {{ perfilStore }}

    </div>
</template>

<script setup>
    // importar paquetes 
    import { ref, onMounted } from "vue"
    import authService from "@/service/AuthService"

import { useContadorStore } from '@/stores/contador'
import { usePerfilStore } from '@/stores/perfil'

const store = useContadorStore()

const perfilStore = usePerfilStore()

    // declarar variables


    const perfil = ref(null)

    onMounted(async () => {
        const {data} = await authService.perfil()
        perfil.value = data
    })
    // metodos o funciones
</script>
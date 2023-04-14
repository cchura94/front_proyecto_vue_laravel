<template>
    <div v-if="perfil">
        <h1>Perfil</h1>
        <h2>ID: {{ perfil.id }}</h2>
        <h2>NOMBRE: {{ perfil.name }}</h2>
        <h2>CORREO: {{ perfil.email }}</h2>
    </div>
    <div v-else>
        <h1>Cargando...</h1>
    </div>
</template>

<script setup>
    // importar paquetes 
    import { ref, onMounted } from "vue"
    import authService from "@/service/AuthService"
    // declarar variables
    const perfil = ref(null)

    onMounted(async () => {
        const {data} = await authService.perfil()
        perfil.value = data
    })
    // metodos o funciones
</script>
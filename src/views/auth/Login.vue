<template>
    <h1>Ingresar</h1>
    <label for="">Ingrese Correo</label>
    <input type="email" v-model="usuario.email">
    <br>
    <label for="">Ingrese Contraseña</label>
    <input type="password" v-model="usuario.password">
    <br>
    <button type="button" @click="loginConLaravel()">Ingresar</button>
    
    {{ usuario }}
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import authService from "@/service/AuthService"

const usuario = ref({ email: "", password: "" })

/*
usuario.value.estado = "PRUEBA" 
usuario.value.name = "PRUEBA nombre" 
usuario.value.otro1 = "PRUEBA1" 
usuario.value.otro12 = "PRUEBA2" 
*/

const loginConLaravel = async () => {
    // const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', usuario.value)
    const res = await authService.loginConLaravel(usuario.value)
    console.log(res.data)
}
</script>

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
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import authService from "@/service/AuthService"

const router = useRouter()

const usuario = ref({ email: "", password: "" })


const loginConLaravel = async () => {
    // const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', usuario.value)
    try {
        const res = await authService.loginConLaravel(usuario.value)
        console.log(res.data)
        if(res.data.error){
            alert(res.data.message)
        }
        else{
            localStorage.setItem("access_token", res.data.access_token);
            router.push({name: "Perfil"})
        }
    } catch (error) {
        alert("Ocurrio un error al autenticar")        
    }
}
</script>

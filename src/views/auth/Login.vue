<template>
   
   <!--
 <h1>Ingresar</h1>
    <label for="">Ingrese Correo</label>
    <input type="email" v-model="usuario.email">
    <br>
    <label for="">Ingrese Contraseña</label>
    <input type="password" v-model="usuario.password">
    <br>
    <button type="button" @click="loginConLaravel()">Ingresar</button>
    
    {{ usuario }}
-->
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenidos!</div>
                        <span class="text-600 font-medium">Ingresar para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Ingresar" class="w-full p-3 text-xl" @click="loginConLaravel()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import authService from "@/service/AuthService"

import { usePerfilStore } from '@/stores/perfil'

const store = usePerfilStore()

const router = useRouter()

const usuario = ref({ email: "", password: "" })


const loginConLaravel = async () => {
    // const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', usuario.value)
    try {
        const res = await authService.loginConLaravel(usuario.value)
        console.log(res.data)

        store.cargarPerfilUsuario(res.data.usuario)

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

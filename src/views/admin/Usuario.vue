<template>
    <h1>Usuario</h1>
    {{ usuarios }}

    <label for="">Ingrese Nombre</label>
    <input type="text" v-model="usuario.name">
    <br>
    <label for="">Ingrese Correo</label>
    <input type="email" v-model="usuario.email">
    <br>
    <label for="">Ingrese Password</label>
    <input type="password" v-model="usuario.password">
    <br>
    <button type="button" @click="guardarUsuario()">Guardar Usuario</button>


    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>CORREO</th>
                <th>ACCION</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="u in usuarios" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td></td>
            </tr>
        </tbody>

    </table>
</template>

<script setup>
    import { ref } from "vue"
    import usuarioService from "@/service/UsuarioService"


    const usuarios = ref([])
    const usuario = ref({name: '', email: '', password:''})

    const listarUsuario = async () => {
        const { data } = await usuarioService.indexUsuario();

        usuarios.value = data
    }

    listarUsuario()

    const guardarUsuario = async () => {
        const {data} = await usuarioService.storeUsuario(usuario.value)
        usuario.value = {name: '', email: '', password:''}
        listarUsuario()
        alert("Usuario Registrado")
    }

</script>
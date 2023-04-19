<template>
    <div class="card">
        <h1>Usuario</h1>
        <!--
        {{ usuarios }}
    
        <label for="">Ingrese Nombre</label>
        <InputText type="text" v-model="usuario.name" />
        <br>
        <label for="">Ingrese Correo</label>
        <InputText type="email" v-model="usuario.email" />
        <br>
        <label for="">Ingrese Password</label>
        <InputText type="password" v-model="usuario.password" />
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
    -->

        <Button label="Nuevo Usuario" icon="pi pi-external-link" @click="openModal" />
        <Dialog header="Registrar Nuevo Usuario" :visible="displayModal" :containerStyle="{ width: '50vw' }" :modal="true"
            class="p-fluid">
            <label for="">Ingrese Nombre</label>
            <InputText type="text" v-model="usuario.name" />
            <br>
            <label for="">Ingrese Correo</label>
            <InputText type="email" v-model="usuario.email" />
            <br>
            <label for="">Ingrese Password</label>
            <InputText type="password" v-model="usuario.password" />
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="displayModal = false" class="p-button-text" />
                <Button label="Guardar Usuario" icon="pi pi-check" @click="guardarUsuario()" autofocus />
            </template>
        </Dialog>

        <ProgressBar mode="indeterminate" style="height: .5em" v-if="usuarios.length==0" />
        <DataTable :value="usuarios" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="NOMBRE"></Column>
            <Column field="email" header="CORREO"></Column>
            <Column header="gestion"></Column>
        </DataTable>

    </div>
</template>

<script setup>
import { ref } from "vue"
import usuarioService from "@/service/UsuarioService"


const usuarios = ref([])
const usuario = ref({ name: '', email: '', password: '' })
const displayModal = ref(false)

const listarUsuario = async () => {
    const { data } = await usuarioService.indexUsuario();

    usuarios.value = data
}

listarUsuario()

const guardarUsuario = async () => {
    const { data } = await usuarioService.storeUsuario(usuario.value)
    usuario.value = { name: '', email: '', password: '' }
    listarUsuario()
    alert("Usuario Registrado")
}

const openModal = () => {
    displayModal.value = true
}


</script>
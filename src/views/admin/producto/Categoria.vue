<template>
  <div class="card">
    <h1>{{ titulo }} {{ store.contador }} </h1>
  <Button label="Nueva Categoria" icon="pi pi-new" @click="visible = true" />

  <DataTable :value="categorias" tableStyle="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="NOMBRE"></Column>
    <Column field="detalle" header="DETALLE"></Column>
    <Column header="action">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" severity="warning" @click="editarCategoria(slotProps.data)" />
            <Button icon="pi pi-trash" severity="danger" @click="eliminarCategoria(slotProps.data)" />
        </template>
    </Column>
</DataTable>

  </div>


<Dialog v-model:visible="visible" modal header="Categoria" :style="{ width: '50vw' }" class="p-fluid">
    <label for="">Nombre Categoria</label>
    <InputText type="text" v-model="categoria.nombre" />
    <label for="">Detalle</label>
    <Textarea v-model="categoria.detalle" rows="5" cols="30" />

    <template #footer>
        <Button label="Cerrar" icon="pi pi-times" @click="visible = false" text />
        <Button label="Guardar" icon="pi pi-check" @click="guardarCategoria()" autofocus />
    </template>
</Dialog>
</template>


<script setup>
// importar
import { ref, onMounted } from "vue";
import categoriaService from "@/service/CategoriaService";
import { useContadorStore } from '@/stores/contador'

const store = useContadorStore()

// declarar variables
const blank_categoria = {
    nombre: "",
    detalle: ""
}
const titulo = ref("Gestión Categorias");
const categorias = ref([]); 
const visible = ref(false);
const categoria = ref(blank_categoria)
// ciclo de vida de componentes
onMounted(() => {
    console.log("Cargando Onmounted...")
    listarCategorias()
})

// funciones o metodos
const listarCategorias = async () => {
    // consumir a la api del servidor
    const {data} = await categoriaService.listar();
    categorias.value = data;
}

const guardarCategoria = async () => {
    if(categoria.value.id > 0){
        // editar
        try {
            await categoriaService.modificar(categoria.value, categoria.value.id)
            visible.value = false; 
            listarCategorias();   
        } catch (error) {
            console.log(error)
            alert("Ocurrió un problema al modificar la categoria")        
        }
    }else{
        try {
            await categoriaService.guardar(categoria.value)
            visible.value = false; 
            listarCategorias();   
        } catch (error) {
            console.log(error)
            alert("Ocurrió un problema al registrar la categoria")        
        }
    }
}

const editarCategoria = (cat) => {
    categoria.value = cat
    visible.value = true;
}
const eliminarCategoria = async (cat) => {
    categoria.value = cat
    if(confirm("Esta seguro de eliminar la categoria?")){
        try {
            await categoriaService.eliminar(categoria.value.id)
            visible.value = false; 
            listarCategorias();   
        } catch (error) {
            console.log(error)
            alert("Ocurrió un problema al eliminar la categoria")        
        }
    }
}
</script>
<template>
  <div class="card">
    <Toast />
    <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Importar" class="mr-2 inline-block" />
                        <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="products"
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Gestionar Productos</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <!--<InputText v-model="filters['global'].value" placeholder="Buscar..." />-->
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="code" header="Code" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">ID</span>
                            {{ slotProps.data.id }}
                        </template>
                    </Column>
                    <Column field="nombre" header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Nombre</span>
                            {{ slotProps.data.nombre }}
                        </template>
                    </Column>
                    <Column header="imagen" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Imagen</span>
                            <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="precio" header="Precio" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Precio</span>
                            {{ formatCurrency(slotProps.data.precio) }}
                        </template>
                    </Column>
                    <Column field="categoria_id" header="Categoria" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Categoria</span>
                            {{ slotProps.data.categoria_id }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
  </div>

   <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalles del Producto" :modal="true" class="p-fluid">
                    {{ product }}
                    <!--
                    <img :src="'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    -->
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="product.nombre" required="true" autofocus :class="{ 'p-invalid': submitted && !product.nombre }" />
                        <small class="p-invalid" v-if="submitted && !product.nombre">El Nombre es Oblogatorio.</small>
                    </div>
                    <div class="field">
                        <label for="description">Descripción</label>
                        <Textarea id="description" v-model="product.descripcion" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label class="mb-3">Categoria</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="1" v-model="product.categoria_id" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="2" v-model="product.categoria_id" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="4" v-model="product.categoria_id" />
                                <label for="category3">Electronics</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Precio</label>
                            <InputNumber id="price" v-model="product.precio" mode="currency" currency="USD" locale="en-US" :class="{ 'p-invalid': submitted && !product.precio }" :required="true" />
                            <small class="p-invalid" v-if="submitted && !product.precio">Precio es requerido.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Cantidad</label>
                            <InputNumber id="quantity" v-model="product.cantidad" integeronly />
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>
                
</template>
<script setup>
// importar
import { ref, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';
import productService from "./../../../service/ProductoService"
// declarar variables
const toast = useToast();
const titulo = ref("Gestión Productos");
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

// funciones o metodos
onMounted(() => {
    listarProductos()
});

const listarProductos = async () => {
    const {data} = await productService.listar();
    products.value = data.data
}

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    submitted.value = true;
    if (product.value.nombre && product.value.nombre.trim() && product.value.precio) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            console.log(product.value)
            
            const {data} = await productService.guardar(product.value)

                listarProductos()
            toast.add({ severity: 'success', summary: 'Guardado Correctamente', detail: 'Producto Registrado', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

// retornar variables o funciones
</script>
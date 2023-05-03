<template>
  <div class="grid">
    <div class="col-7">
      <div class="card">
        <h5>Lista Productos</h5>

        <DataTable
          ref="dt"
          :value="productos"
          dataKey="id"
          :paginator="true"
          lazy
          :totalRecords="totalRecords"
          :loading="loading"
          @page="onPage($event)"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
          responsiveLayout="scroll"
        >
          <Column
            field="nombre"
            header="Nombre"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Nombre</span>
              {{ slotProps.data.nombre }}
            </template>
          </Column>
          <Column header="imagen" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <span class="p-column-title">Imagen</span>

              <img
                :src="'http://127.0.0.1:8000/' + slotProps.data.imagen"
                :alt="slotProps.data.nombre"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column
            field="precio"
            header="Precio"
            :sortable="true"
            headerStyle="width:14%; min-width:4rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Precio</span>
              {{ formatCurrency(slotProps.data.precio) }}
            </template>
          </Column>
          <Column
            field="categoria_id"
            header="Categoria"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Categoria</span>
              {{ slotProps.data.categoria.nombre }}
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-success mr-2"
                @click="addCarrito(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="col-5">
      <div class="grid">
        <div class="col-12">
          <div class="card">
            <h5>Carrito</h5>

            <DataTable :value="carrito">
              <Column field="nombre" header="Nombre"></Column>
              <Column field="precio" header="Precio"></Column>
              <Column field="cantidad" header="Cantidad"></Column>
              <Column>
                <template #body="slotProps">
                  <Button
                    icon="pi pi-plus"
                    class="p-button-rounded p-button-danger mr-2"
                    @click="quitarCarrito(slotProps.data)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <h5>Cliente</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="buscarClie" placeholder="Buscar" />
              <Button
              label="Buscar"
              icon="pi pi-search"
              @click="buscarCliente"
            />
            </span>
            <Button
              label="Nuevo Cliente"
              icon="pi pi-external-link"
              @click="visibleClie = true"
            />

            <Dialog
              v-model:visible="visibleClie"
              modal
              header="Nuevo Cliente"
              :style="{ width: '50vw' }"
            >
            
            <label for="">Ingrese Nombre Completo</label>
            <InputText type="text" v-model="dataCliente.nombre_completo" />
            
            <label for="">Ingrese CI NIT</label>
            <InputText type="text" v-model="dataCliente.ci_nit" />
            
            <label for="">Ingrese Telefono</label>
            <InputText type="text" v-model="dataCliente.telefono" />
            
            <label for="">Ingrese Correo</label>
            <InputText type="text" v-model="dataCliente.correo" />

            <Button
              label="Guardar Cliente"
              icon="pi pi-external-link"
              @click="nuevoCliente"
            />

            </Dialog>

            <div class="card" v-if="cliente.id">
              <h6>Nombres: {{ cliente.nombre_completo }}</h6>
              <h6>CI/NIT: {{ cliente.ci_nit }}</h6>
              <h6>Telefono: {{ cliente.telefono }}</h6>
              <h6>Correo: {{ cliente.correo }}</h6>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <Button
              label="Registrar Pedido"
              icon="pi pi-external-link"
              @click="nuevoPedido"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import productoService from "../../../service/ProductoService";
import pedidoService from "../../../service/PedidoService";

const productos = ref([]);
const carrito = ref([]);
const dt = ref(null);
const filters = ref({});

const loading = ref(false);
const totalRecords = ref(0);
const lazyParams = ref({});

const cliente = ref({});
const visibleClie = ref(false);
const buscarClie = ref('');
const dataCliente = ref({nombre_completo: '', ci_nit: '', telefono: '', correo: ''});

onMounted(async () => {
  loading.value = true;

  lazyParams.value = {
    first: 0,
    rows: dt.value.rows,
    sortField: null,
    sortOrder: null,
    filters: filters.value,
  };

  listarProductos();
});

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const listarProductos = async () => {
  loading.value = true;

  // { lazyEvent: JSON.stringify(lazyParams.value) }
  let page = lazyParams.value.page + 1;
  let limit = lazyParams.value.rows;

  const { data } = await productoService.listar(page, limit);
  productos.value = data.data;

  totalRecords.value = data.total;
  loading.value = false;
};

const onPage = (event) => {
  lazyParams.value = event;
  listarProductos();
};

const addCarrito = (producto) => {
  carrito.value.push({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: 1,
  });
};

const quitarCarrito = (producto) => {
  const posicion = carrito.value.indexOf(producto);
  carrito.value.splice(posicion - 1, 1);
};

const buscarCliente = async () => {
    const {data} = await pedidoService.buscarCliente(buscarClie.value)

    cliente.value = data
}

const nuevoCliente = async () => {
    const {data} = await pedidoService.nuevoCliente(dataCliente.value)

    cliente.value = data

    visibleClie.value = false
}

const nuevoPedido = async () => {
    let ped= {
        cliente_id: cliente.value.id,
        productos: carrito.value
    }
    const {data} = await pedidoService.guardar(ped);
}
</script>
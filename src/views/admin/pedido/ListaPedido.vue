<template>
  <div class="card">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="pedidos"
      dataKey="id"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      tableStyle="min-width: 60rem"
    >
      <template #header>
        <div class="flex flex-wrap justify-content-end gap-2">
          <Button
            text
            icon="pi pi-plus"
            label="Expand All"
            @click="expandAll"
          />
          <Button
            text
            icon="pi pi-minus"
            label="Collapse All"
            @click="collapseAll"
          />
        </div>
      </template>
      <Column expander style="width: 5rem" />
      <Column field="fecha" header="Fecha"></Column>
      <!--
            <Column header="Image">
                <template #body="slotProps">
                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-4" width="64" />
                </template>
            </Column>
            -->
      <!--
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            -->
      <Column field="cliente.nombre_completo" header="Cliente"></Column>

      <Column header="Estado">
        <template #body="slotProps">
          {{ slotProps.data.estado }}
        </template>
      </Column>
      <Column headerStyle="width:4rem">
        <template #body="slotProps">
          <Button icon="pi pi-print" @click="downloadPDF(slotProps.data)" />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="p-3">
          <h5>Productos {{ slotProps.data.cliente_id }}</h5>
          <DataTable :value="slotProps.data.productos">
            <Column field="id" header="Id" sortable></Column>
            <Column field="nombre" header="Nombre" sortable></Column>
            <Column field="precio" header="Precio" sortable></Column>
            <!--
                        <Column field="amount" header="Amount" sortable>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.amount) }}
                            </template>
                        </Column>
                        -->
            <Column field="pivot.cantidad" header="Cantidad"></Column>
            <!--
                        <Column headerStyle="width:4rem">
                            <template #body>
                                <Button icon="pi pi-search" @click="downloadPDF" />
                            </template>
                        </Column>
                        -->
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import pedidoService from "@/service/PedidoService";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const pedidos = ref();
const expandedRows = ref([]);
const toast = useToast();

onMounted(async () => {
  const { data } = await pedidoService.listar();
  pedidos.value = data.data;
});

const onRowExpand = (event) => {
  toast.add({
    severity: "info",
    summary: "Product Expanded",
    detail: event.data.name,
    life: 3000,
  });
};
const onRowCollapse = (event) => {
  toast.add({
    severity: "success",
    summary: "Product Collapsed",
    detail: event.data.name,
    life: 3000,
  });
};
const expandAll = () => {
  expandedRows.value = pedidos.value.filter((p) => p.id);
};
const collapseAll = () => {
  expandedRows.value = null;
};
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const downloadPDF = (data) => {

const doc = new jsPDF();

doc.setFontSize(22);
doc.text('RECIBO', 80, 20);

doc.setFontSize(12);
doc.text('Fecha Pedido: ' + data.fecha, 20, 40);
doc.text('Nombre del Cliente: ' + data.cliente.nombre_completo, 20, 50);
doc.text('Nit/CI: ' + data.cliente.ci_nit, 20, 60);
doc.text('Teléfono: ' + data.cliente.telefono, 20, 70);

const headers = [['Producto', 'Precio', 'Cantidad', 'Subtotal']];
const dataProductos = data.productos.map((producto) => [producto.nombre, producto.precio, producto.pivot.cantidad, producto.precio * producto.pivot.cantidad]);
const subtotal = dataProductos.reduce((acc, curr) => acc + curr[3], 0);

doc.autoTable({
  head: headers,
  body: dataProductos,
  startY: 80
});

doc.text('Subtotal: $' + (subtotal).toFixed(2), 130, doc.autoTable.previous.finalY + 10);
doc.text('IVA (13%): $' + (subtotal * 0.13).toFixed(2), 130, doc.autoTable.previous.finalY + 20);

doc.text('Total: $' + (subtotal * 1.13).toFixed(2), 130, doc.autoTable.previous.finalY + 30);

doc.save('recibo.pdf');

};
</script>

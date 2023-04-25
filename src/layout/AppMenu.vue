<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Dashboard',
        items: [
            { label: 'Admin', icon: 'pi pi-fw pi-home', to: '/admin' },
            { label: 'Perfil', icon: 'pi pi-fw pi-user', to: '/admin/perfil' }
        ]
    },
    {
        label: 'Gestión Productos',
        items: [
            { label: 'Categoria', icon: 'pi pi-fw pi-id-card', to: '/admin/categoria' },
            { label: 'Producto', icon: 'pi pi-fw pi-check-square', to: '/admin/producto' },
        ]
    },
    {
        label: 'Pedidos',
        items: [
            { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-eye', to: '/admin/pedido/nuevo', badge: 'NEW' },
            { label: 'Lista pedidos', icon: 'pi pi-fw pi-globe', to: '/admin/pedido' },
            { label: 'Clientes', icon: 'pi pi-fw pi-globe', to: '/admin/cliente' }
        ]
    },
    {
        label: 'Usuarios',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-prime', to: '/admin/usuario' },
            { label: 'Seguridad', icon: 'pi pi-fw pi-desktop', to: '/admin/seguridad' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!--
            <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
        -->
    </ul>
</template>

<style lang="scss" scoped></style>

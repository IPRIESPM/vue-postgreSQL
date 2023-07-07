<template>
    <section class="loading" v-if="loading">
        Cargando <div class="loading"></div>
    </section>
    <section class="error" v-else-if="error">
        <p>{{ error }}</p>
    </section>
    <section class="tableData" v-else-if="localData.length > 0">
        <table>
            <thead>
                <tr>
                    <th>Profesor</th>
                    <th>Correo electrónico</th>
                    <th>Teléfono</th>
                    <th>Dni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="teacher in localData" :key="teacher.id">
                    <td>
                        <font-awesome-icon :icon="['fas', 'user-graduate']" />
                        {{ teacher.nombre }}</td>
                    <td>{{ teacher.correo }}</td>
                    <td>{{ teacher.telefono }}</td>
                    <td>{{ teacher.dni }}</td>
                </tr>
            </tbody>
        </table>
    </section>
    <div class="noData" v-else>
        <p>No hay datos</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import getAllData from '../../controllers/data';

const loading = ref(true);
const localData = ref([]);
const error = ref(null);

onMounted(async () => {
  const { datos } = await getAllData('teachers');

  localData.value = datos;
  console.log('Los datos son: ', datos);
  loading.value = false;
});
</script>

<style scoped>
section.tableData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

section.tableData table thead{
   color: var(--color-text-muted);
   text-align: left;
   margin-bottom: 0.5rem; /* Add margin-bottom to create space */
}
table thead th{
    font-weight: inherit;
    border-bottom: 1px solid var(--color-text-muted);
    text-align: left;
}

section.tableData table tbody td{
    color: var(--color-text-muted);
    border-bottom: 1px solid var(--color-text-muted);
}

</style>

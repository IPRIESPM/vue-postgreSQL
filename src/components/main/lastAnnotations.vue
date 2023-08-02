<script setup>
import { onMounted, ref } from 'vue';
import { getLastAnnotationFromApi } from '../../controllers/api/annotations';

const loading = ref(false);
const lastAnnotation = ref(null);

onMounted(async () => {
  console.log('LastAnnotations mounted');
  loading.value = true;
  lastAnnotation.value = await getLastAnnotationFromApi();
  loading.value = false;
});
</script>
<template>
  <section class="loading" v-if="loading">
    <h1>Cargando...</h1>
  </section>
  <section class="main" v-else>
    <ul v-for="annotation in lastAnnotation" :key="annotation.codigo">
      <li>Fecha: {{ new Date(annotation.fecha).toLocaleDateString() }}</li>
      <li>
        <font-awesome-icon :icon="['fas', 'user-graduate']" />
        {{ annotation.nombre_profesor }}
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'building']" />
        {{ annotation.nombre_empresa }}
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'address-card']" />
        {{ annotation.nombre_contacto }}
      </li>
      <li>{{ annotation.verificado }}</li>
    </ul>
  </section>
</template>
<style scoped>
section.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  height: 80vh !important;
  overflow-y: scroll;
}
section.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

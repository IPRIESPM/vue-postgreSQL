<script setup>
import { onMounted, ref } from 'vue';
import { getLastAnnotationFromApi } from '../../controllers/api/annotations';
import LoadingText from '../loading/loadingText.vue';

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
  <LoadingText v-if="loading" />
  <section class="main" v-else>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th> <font-awesome-icon :icon="['fas', 'user-graduate']" /> Profesor </th>
          <th> <font-awesome-icon :icon="['fas', 'building']" /> Empresa </th>
          <th>  <font-awesome-icon :icon="['fas', 'address-card']" /> Contacto </th>
          <th>Verificado</th>
          <th class="icons"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="annotation in lastAnnotation" :key="annotation.codigo">
          <td>
            {{ new Date(annotation.fecha).toLocaleDateString() }}
          </td>
          <td>

            {{
              annotation.nombre_profesor
            }}
          </td>
          <td>

            {{ annotation.nombre_empresa }}
          </td>
          <td>
            {{ annotation.nombre_contacto }}
          </td>
          <td>
            {{ annotation.verificado ? "Confirmado" : "No confirmado" }}
          </td>
          <td class="icons">
              Ver comentario
          </td>
        </tr>
      </tbody>
    </table>
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

table {
  width: 100%;
  border-collapse: collapse;
}

section.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

table th.icons{
  text-align: center ;
}
</style>

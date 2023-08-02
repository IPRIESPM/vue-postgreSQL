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
        {{ lastAnnotation  }}
    </section>
</template>
<style scoped>
</style>

<template>
    <section class="loading">
        <p> {{ loadingText }} </p>
        <div class="loading"></div>
    </section>
</template>
<script setup>
defineProps({
  loadingText: {
    type: String,
    default: 'Cargando...',
  },
});
</script>
<style scoped>
    section{
        display: flex;
    }
</style>

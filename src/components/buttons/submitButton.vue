<template>
     <button v-if="loading" type="button" class="loading">
        <span>{{loadingText}}</span>
        <font-awesome-icon :icon="['fas', 'arrows-rotate']" class="rotate" />
      </button>
      <input v-else class="button" type="submit" :value="idleText">
</template>
<script setup>

import { defineProps } from 'vue';

defineProps({
  loading: Boolean,
  idleText: String,
  loadingText: String,
});

</script>
<style scoped>
  input[type='submit'] {
      background: var(--color-background-mute);
  }
</style>

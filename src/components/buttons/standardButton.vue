<template>
     <button v-if="loading" type="button" class="loading" :class="{ 'is-rounded': rounded }">
        <span>{{loadingText}}</span>
        <font-awesome-icon :icon="['fas', 'arrows-rotate']" class="rotate" />
      </button>
      <input v-else type="submit" :value="idleText">
</template>
<script setup>

import { defineProps } from 'vue';

defineProps({
  loading: Boolean,
  idleText: String,
  loadingText: String,
  rounded: Boolean,
});

</script>
<style scoped>
  input{
    text-transform: capitalize;
  }
  .is-rounded{
    background-color: red;
  }
</style>

<template>
  <button
    type="button"
    class="add"
    :class="size"
  >
    <font-awesome-icon v-if="modal" :icon="['fas', 'xmark']" />
    <font-awesome-icon v-else :icon="['fas', 'plus']" />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modal: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    default: 'lg',
  },
});
</script>

<style scoped>
button.add {
    position: relative;
    top: -200px;
    right: 20px;
    border-radius: 100%;
    outline: none;
    border: none;
    background-color: var(--color-background);
}
button.add.lg {
    width: 50px;
    height: 50px;
}
button.add.sm {
    width: 30px;
    height: 30px;
}

</style>

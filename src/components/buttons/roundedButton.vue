<template>
  <button type="button" class="add" :class="color">
    <font-awesome-icon v-if="modal" :icon="['fas', 'xmark']" />
    <font-awesome-icon v-else :icon="['fas', 'plus']" />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  modal: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'lg',
  },
});

</script>

<style scoped>
button.add {
    border-radius: 100%;
    outline: none;
    border: none;
    background: var(--color-background-soft);
    cursor: pointer;
}
button.add.lg {
    width: 50px;
    height: 50px;
}
button.add.sm {
    width: 30px;
    height: 30px;
}
button.modal {
  background: var(--button-background);
}

</style>

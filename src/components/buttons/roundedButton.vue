<template>
  <button type="button" class="add" :class="[color, shadow ? '' : 'shadow']">
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
  shadow: {
    type: Boolean,
    default: false,
  },
});

</script>

<style scoped>
button.add {
    border-radius: 100%;
    outline: 1px solid transparent;
    border: 1px solid transparent;
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

button.shadow{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>

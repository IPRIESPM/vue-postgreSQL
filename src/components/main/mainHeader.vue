<script setup>
import { defineProps } from 'vue';
import ProfileButton from '../buttons/profileButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
    <header>
        <h2>{{ props.title == "dashboard" ? "Últimos movimientos" : props.title }}</h2>
        <ProfileButton  />
    </header>
</template>

<style scoped>
    header {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

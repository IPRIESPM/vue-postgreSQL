<script setup>

import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import LoginForm from '../components/loginForm.vue';
import NewProfesor from '../components/newProfesor.vue';

const router = useRouter();

if (Cookie.get('token')) {
    router.push({ name: 'dashboard' });
}

</script>

<template>
    <section class="login">
        <LoginForm />
    </section>
</template>

<style scoped>
section.login {
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;
}
</style>

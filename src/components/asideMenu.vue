<script setup>
import { useRouter } from 'vue-router';

import logoSvg from '../assets/svg/Logo.svg';

const router = useRouter();

const navigateTo = (route) => {
  router.push({ name: route });
};

</script>
<template>

    <aside>
        <figure>
            <img :src="logoSvg" alt="Logo">
            <h1 class="title">CRM</h1>
        </figure>
        <nav>
            <a href="#" @click="navigateTo('dashboard')">
                <p><font-awesome-icon :icon="['fas', 'house-user']" /></p>
                <p>Principal</p>
            </a>
            <a href="#" @click="navigateTo('empresas')">
                <p><font-awesome-icon :icon="['fas', 'address-book']" /></p>
                <p>Empresas</p>
            </a>
            <a href="#" @click="navigateTo('profesores')">
                <p><font-awesome-icon :icon="['fas', 'user-graduate']" /></p>
                <p>profesores</p>
            </a>
        </nav>
    </aside>
</template>
<style scoped>

    aside{
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        padding: 1em 2em;
        gap: 4em;

        background: var(--color-background-soft);
    }

    figure {
        display: flex;
        align-items: center;
        gap: 15px;
        width: 100%;
    }

    nav{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2.2em;

        width: 100%;
    }

    a{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        transition: color 0.3s ease;
    }

    a p{
        min-width: 32px;
        text-transform: capitalize;
        display: grid;
        place-items: center;
    }

</style>

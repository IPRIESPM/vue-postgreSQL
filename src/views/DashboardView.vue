<script setup>
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import AsideMenu from '../components/asideMenu.vue';
import MainHeader from '../components/main/mainHeader.vue';
import MainSection from '../components/main/mainSection.vue';

const router = useRouter();
const tokenValidate = ref(false);

onBeforeMount(() => {
  if (!Cookie.get('token')) {
    router.push({ name: 'home' });
  } else {
    tokenValidate.value = true;
  }
});

</script>
<template>
    <section class="dashboard" v-if="tokenValidate">
        <AsideMenu />
        <main>
            <MainHeader :title="$route.name" />
            <MainSection :section="$route.name" />
        </main>
    </section>
</template>
<style scoped>
    section.dashboard{
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-template-areas:
            "aside main"
        ;

        height: 100vh;
    }

    main{
        grid-area: main;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 2em;
    }
    aside{
        grid-area: aside;
    }
</style>

<script setup>
import { ref, onMounted } from 'vue';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import userStore from '../store/user';

const router = useRouter();
const navVisible = ref(false);
const user = ref(null);

const Store = userStore();

const showOptions = () => {
  navVisible.value = !navVisible.value;
};

const destroyCookie = () => {
  Cookie.remove('token');
  console.log('Cookie destroyed');
  router.push({ name: 'home' });
};

onMounted(async () => {
  const storedUser = Store.getUser;
  console.log(storedUser);
  user.value = storedUser;
});

const navigateTo = (route) => {
  console.log(route);
  router.push({ name: route });
};
</script>

<template>
    <button class="profile-button" type="button" @click="showOptions" v-if="user">
      <font-awesome-icon :icon="['fas', 'circle-user']" />
      <span>{{ user.nombre }}</span>
      <font-awesome-icon :icon="['fas', 'angle-up']" v-if="navVisible" />
      <font-awesome-icon :icon="['fas', 'angle-down']" v-else />
      <nav :class="{ 'show-nav': navVisible }">
        <a @click="navigateTo('perfil')">Perfil</a>
        <a @click="destroyCookie">Cerrar Sesión</a>
      </nav>
    </button>
</template>

<style scoped>
button.profile-button {
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  font-size: 1.18em;
  color: var(--color-text);
  width: max-content;
  height: 35px;
}

nav {
  display: flex;
  flex-direction: column;
  position: absolute;

  top: 30px;
  right: 2.5em;
  width: 200px;
  gap: 0.3em;

  background-color: var(--color-background);

  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
}

nav.show-nav {
  opacity: 1;
  top: 70px;
  visibility: visible;
  transition: all 0.3s ease-in-out;
}

nav a {
  font-size: 1em;
}
</style>

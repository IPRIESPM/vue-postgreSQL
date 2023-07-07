<script setup>
import { ref, onMounted } from 'vue';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import { getUserLocalStorage } from '../controllers/session';

const router = useRouter();
const navVisible = ref(false);
const user = ref(null);
const showOptions = () => {
  navVisible.value = !navVisible.value;
};

const destroyCookie = () => {
  Cookie.remove('token');
  console.log('Cookie destroyed');
  localStorage.removeItem('user');
  console.log('User removed from localStorage');
  router.push({ name: 'home' });
};

onMounted(async () => {
  const storedUser = await getUserLocalStorage();
  if (storedUser) {
    user.value = storedUser;
    console.log(JSON.stringify({ nombre: user.value.nombre, telefono: user.value.telefono }));
  }
});

</script>

<template>
    <button class="profile-button" type="button" @click="showOptions" v-if="user">
      <font-awesome-icon :icon="['fas', 'circle-user']" />
      <span>{{ user.nombre }}</span>
      <font-awesome-icon :icon="['fas', 'angle-down']" />
      <nav :class="{ 'show-nav': navVisible }">
        <a>Perfil</a>
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
  opacity: 0;
  visibility: hidden;
  transition: all 0.8s ease-in-out;
}

nav.show-nav {
  opacity: 1;
  top: 70px;
  visibility: visible;
  transition: all 0.8s ease-in-out;
}

nav a {
  font-size: 1em;
}
</style>

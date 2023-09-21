<template>
  <section>
    <button class="button color-scheme" @click="changeColorScheme">
        <font-awesome-icon v-if="savedTheme === 'dark'" :icon="['fas', 'sun']" />
        <font-awesome-icon v-else :icon="['fas', 'moon']"  />
        <div class="slider round"></div>
    </button>

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
</section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import userStore from '../../store/user';

const router = useRouter();
const navVisible = ref(false);
const user = ref(null);

const Store = userStore();

const showOptions = () => {
  navVisible.value = !navVisible.value;
};

const destroyCookie = () => {
  Cookie.remove('token');
  router.push({ name: 'home' });
};

onMounted(async () => {
  const storedUser = Store.getUser;
  user.value = storedUser;
  if (!storedUser.dni) destroyCookie();
});

const navigateTo = (route) => {
  router.push({ name: route });
};

const savedTheme = ref('light');

const changeColorScheme = () => {
  const colorScheme = document.querySelector('html[data-theme]');
  const colorSchemeValue = colorScheme.getAttribute('data-theme');

  if (colorSchemeValue === 'dark') {
    colorScheme.setAttribute('data-theme', 'light');
    savedTheme.value = 'light';
  } else {
    colorScheme.setAttribute('data-theme', 'dark');
    savedTheme.value = 'dark';
  }
};
</script>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
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
button.profile-button {
  border: none !important;
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

button {
        background: transparent;
        border: none;
        cursor: pointer;
        width: 20px;
        border: solid 1px transparent;
    }
button:focus {
        outline: none;
        border:solid 1px transparent !important;
    }

    button.color-scheme{
      border: solid 2px var(--color-text);
      border-radius: 100%;
      width: 25px;

      padding:0;
      margin: 0;

      padding: 3px
    }

    button.color-scheme:focus {
      outline: none;
      border:solid 2px var(--color-text) !important;
    }
</style>

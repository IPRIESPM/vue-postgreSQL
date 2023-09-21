<template>
  <section class="loginForm">
    <figure>
      <img :src="logoSvg" alt="Logo">
      <h1>CRM</h1>
    </figure>
    <section class="error-message" :class="{ 'error-class': dataError.error }">
      <p v-if="dataError.error">{{ dataError.message }}</p>
    </section>
    <form @submit.prevent="onSubmit" id="logging" novalidate >

      <fieldset>
        <label for="dni">DNI del usuario</label>
        <input type="text" name="dni" id="dni" placeholder="11111111T">
      </fieldset>
      <fieldset>
        <label for="password">Contraseña</label>
        <input type="password" name="contrasena" id="password" placeholder="********" >
      </fieldset>

      <submitButton
        :loading="loading"
        idleText="Acceder"
        loadingText="Iniciando"
        @click="submitForm"
        formnovalidate
      />
    </form>
  </section>
</template>

<script setup>
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import userStore from '../store/user';

import logoSvg from '../assets/svg/Logo.svg';
import login from '../controllers/session';
import submitButton from './buttons/submitButton.vue';

const router = useRouter();
const loading = ref(false);
const dataError = ref({ error: false });
const storedUser = userStore();

const onSubmit = async (event) => {
  event.preventDefault();

  loading.value = true;
  const formInputs = Array.from(event.target.elements).filter((element) => element.tagName.toLowerCase() === 'input' && element.type !== 'submit');

  formInputs.forEach((input) => {
    input.setCustomValidity('');
    const modifiedInput = input;
    modifiedInput.valid = false;
  });

  try {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (!data.dni || !data.contrasena) throw new Error('Faltan datos en el formulario.');
    const loginData = await login(data);
    await Cookies.set('token', loginData.token, { expires: 7 });
    storedUser.setUser(loginData.user);
    router.push({ name: 'dashboard' });
  } catch (error) {
    if (error.message.includes('401 Unauthorized')) {
      formInputs.forEach((input) => {
        input.setCustomValidity('Usuario o contraseña incorrectos.');
      });
      dataError.value.error = true;
      dataError.value.message = 'Usuario o contraseña incorrectos.';
    } else {
      formInputs.forEach((input) => {
        const modifiedInput = input;
        if (modifiedInput.value === '') {
          modifiedInput.setCustomValidity('Este campo es obligatorio.');
        }
        modifiedInput.valid = false;
      });
      console.error('Error en la solicitud de inicio de sesión:', error.message);
      dataError.value.error = true;
      dataError.value.message = error.message;
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const formInputs = document.querySelectorAll('.loginForm input:not([type="submit"])');
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.setCustomValidity('');
      const modifiedInput = input;
      modifiedInput.valid = true;
    });
  });
});
</script>

<style scoped>
section.loginForm {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 22px;

    width: 550px;
    max-width: 550px;
    min-width: 550px;
    height: min-content;
    padding: 38px 39px;

    background: var(--color-background-soft);
    border-radius: 4px;
}

figure {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
}

fieldset {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    gap: 15px;
}

section.error-message{
    position: relative;
    color: var(--color-error);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    height: 15px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
}

section.error-message.error-class{
    opacity: 1;
    transition: all 0.3s ease-in-out;
    animation: bounce 0.5s 1 linear forwards;
}

</style>

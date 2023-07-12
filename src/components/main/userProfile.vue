<template>
    <section class="userProfile" v-if="!editMode">
        <font-awesome-icon :icon="['fas', 'circle-user']" class="icon" />
        <section class="userInfo">
            <h1>{{ userProfile.nombre }}</h1>
            <section class="contact">
                <p><font-awesome-icon :icon="['fas', 'address-card']" /> {{ userProfile.dni }}</p>
                <p><font-awesome-icon :icon="['fas', 'mobile']" /> {{ userProfile.telefono }}</p>
            </section>

            <p>
               {{ userProfile.correo }}
            </p>
        </section>
        <button type="button" @click="changeMode"> Editar </button>
    </section>
    <form id="userForm" @submit.prevent="onSubmit" v-else>
        <section class="error-message" :class="{ 'show': submitError }">
          <p>{{ errorMessage }}</p>
        </section>
        <font-awesome-icon :icon="['fas', 'circle-user']" class="icon" />
        <section class="userInfo">
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Alejandro"
                required
                v-model="userModified.nombre"
              >
          <section class="contact">
            <input
                type="text"
                name="dni"
                id="dni"
                placeholder="A12345678"
                v-model="userModified.dni"
                required
              >

              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="965331234"
                required
                v-model="userModified.telefono"
              >
          </section>
          <input
                type="text"
                name="correo"
                id="correo"
                placeholder="example@example.com"
                required
                v-model="userModified.correo"
              >

        </section>
        <label for="contrasena">Sobrescribir la contraseña</label>
        <input
                type="password"
                name="contrasena"
                id="contrasena"
                placeholder="*******"
                v-model="userModified.contrasena"
              >
          <section class="buttons">
            <submitButton
              :loading="submitLoading"
              idleText="Editar"
              loadingText="Cargando"
            />
            <button type="button" class="cancel" @click="changeMode"> Cancelar </button>
          </section>

      </form>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import userStore from '../../store/user';
import submitButton from '../submitButton.vue';
import { editData } from '../../controllers/data';

const storedUser = userStore();
const userProfile = ref({});
const userModified = ref({});
const submitLoading = ref(false);
const submitError = ref(false);
const errorMessage = ref('');
const editMode = ref(false);

const changeMode = () => {
  editMode.value = !editMode.value;
  if (editMode.value) {
    userModified.value = { ...storedUser.getUser };
  }
};
const onSubmit = async (event) => {
  event.preventDefault();
  submitLoading.value = true;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const responseData = await editData('teachers', data);
  console.log('esto tengo de la api', responseData);
  if (!responseData) {
    event.target.classList.add('bounce');
    errorMessage.value = 'Error al Actualizar tu perfil';
  } else {
    storedUser.setUser(userModified.value);
    changeMode();
  }
  submitLoading.value = false;
};

onMounted(async () => {
  userProfile.value = storedUser.getUser;
});
</script>
<style scoped>
section.userProfile,
form#userForm{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 1em;
}

 .icon{
    font-size: 10em;
    color: var(--color-text);
}

section.userProfile .userInfo{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 0.6em;
}

section.userProfile section.contact{
    display: flex;
    gap: 1.5em;
}

section.buttons{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
}

button.cancel{
    background-color: var(--button-background-hover);
    color: var(--color-text);
    border: 1px solid var(--button-background);

    border-radius: 2px;
    height: 46px;
}
input:not([type="submit"]),
input:not([type="button"]){
    padding: 0.5em 1em;
    border-radius: 2px;
    font-size: 1em;
    border: 1px solid var(--color-text);
    box-sizing: border-box;
    margin: 0.5em 0.2em;
}
</style>

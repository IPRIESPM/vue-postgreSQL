<script setup>
import { ref } from 'vue';

import {
  updateContactFromApi,
  newContact,
} from '../../controllers/api/contacts';

import RoundedButton from '../buttons/roundedButton.vue';
import SubmitButton from '../buttons/submitButton.vue';

import modalStore from '../../store/modal';
import contactStore from '../../store/contact';
import companyStore from '../../store/perfilEmpresa';

const modalStored = modalStore();
const contactStored = contactStore();
const companyStored = companyStore();

const showModal = modalStored.getShowModal;
const editMode = modalStored.getEditMode;
const loading = modalStored.getLoading;
const error = ref(false);
const errorMessages = ref('');

const contactData = contactStored.getContact;
contactData.company = companyStored.cif;

const closeModal = () => {
  modalStored.setShowModal(false);
};

const onSubmitContact = async (event) => {
  event.preventDefault();
  let response = null;
  if (editMode) {
    response = await updateContactFromApi(contactData);
  } else {
    response = await newContact(contactData);
  }
  if (response) {
    closeModal();
    error.value = false;
    errorMessages.value = '';
  } else {
    error.value = true;
    errorMessages.value = 'Error al añadir el contacto';
  }
};
</script>

<template>
  <form @submit="onSubmitContact">
    <section class="header">
      <h2 v-if="editMode">Editar contacto</h2>
      <h2 v-else>Añadir nuevo contacto</h2>
    </section>
    <section class="error">
      <p v-if="error">{{ errorMessages }}</p>
    </section>
    <section class="main">
      <section class="fieldset-group">
        <fieldset>
          <label for="dni">Dni</label>
          <input
            type="text"
            name="dni"
            id="dni"
            placeholder="12345678A"
            v-model="contactData.dni"
          />
        </fieldset>
        <fieldset>
          <label for="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Silvia Amorós"
            v-model="contactData.name"
            class="required"
            @change="onChange"
            autofocus
          />
        </fieldset>
      </section>

      <section class="fieldset-group">
        <fieldset>
          <label for="email">Correo</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example"
            class="required"
            @change="onChange"
            v-model="contactData.email"
          />
        </fieldset>

        <fieldset>
          <label for="phone">Telefono</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            class="required"
            placeholder="612345678"
            @change="onChange"
            v-model="contactData.phone"
          />
        </fieldset>
      </section>
    </section>
    <section class="fieldset-group">
      <fieldset>
        <label for="type">Tipo</label>
        <select name="tipo" id="tipo" v-model="contactData.type">
          <option value="Gerente">Gerente</option>
          <option value="Jefe Proyecto">Jefe Proyecto</option>
          <option value="Técnico">Técnico</option>
          <option value="Tutor">Tutor</option>
          <option value="RRHH">RRHH</option>
        </select>
      </fieldset>
      <fieldset class="checkbox">
        <label for="principal">Principal</label>
        <input
          type="checkbox"
          name="principal"
          id="principal"
          v-model="contactData.principal"
        />
      </fieldset>
    </section>

    <fieldset>
      <label for="functions">Funciones</label>
      <textarea
        name="functions"
        id="functions"
        cols="30"
        rows="10"
        v-model="contactData.functions"
      ></textarea>
    </fieldset>

    <section class="button-group">
      <SubmitButton
        :idleText="editMode ? 'Editar' : 'Añadir'"
        :loading="loading"
        loadingText="Cargando"
      />
      <button type="button" class="cancel" @click="closeModal">Cancelar</button>
      <RoundedButton
        :modal="showModal"
        :class="{ modal: showModal }"
        class="contacts"
        @click="closeModal"
      />
    </section>
  </form>
</template>
<style scoped>
section.button-group {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
}
section.header {
  margin-bottom: 1.5em;
}

section.fieldset-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

section.button-group {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
}
fieldset.checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 50px;
  padding-left: 90px;
}

button.add.contacts {
  position: absolute;
  transform: translate(240px, -748px);
}
</style>

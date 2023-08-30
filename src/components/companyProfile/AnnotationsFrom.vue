<script setup>
import {
  ref, onMounted, onBeforeMount, watch,
} from 'vue';
import RoundedButton from '../buttons/roundedButton.vue';
import SubmitButton from '../buttons/submitButton.vue';
import companyStore from '../../store/perfilEmpresa';

import modalStore from '../../store/modal';
import userStore from '../../store/user';
import annotationStore from '../../store/annotations';

import { newAnnotation, updateAnnotationFromApi } from '../../controllers/api/annotations';

const companyStored = companyStore();
const modalStored = modalStore();
const userStored = userStore();
const annotationStored = annotationStore();

const loading = ref(false);
const contactSelected = ref('');

const editMode = ref(false);
// eslint-disable-next-line no-unused-vars
const contacts = ref(companyStored.getContactos);
const error = ref(false);
const errorMessages = ref('');

const actualDay = ref(new Date().toISOString().split('T')[0]);
const actualYear = ref(new Date().getFullYear());

const selectedAnnotationData = ref({
  anyo: actualYear.value,
  fecha: actualDay.value,
  tipo: 'Teléfono',
  anotacion: '',
  confirmado: false,
  contactoN: contactSelected.value,
  profesorDni: userStored.getUser.dni,
});

const resetFromData = () => {
  selectedAnnotationData.value = {
    anyo: actualYear.value,
    fecha: actualDay.value,
    tipo: 'Teléfono',
    anotacion: '',
    confirmado: false,
    contactoN: contactSelected.value,
    profesorDni: userStored.getUser,
  };
};

const buttonModal = () => {
  modalStored.setShowModal(false);
  modalStored.setEditMode(false);
  annotationStored.$reset();
};

const onSubmit = async (event) => {
  event.preventDefault();
  console.log('Enviando anotacion...');
  loading.value = true;
  selectedAnnotationData.value.contactoN = contactSelected.value;
  let response;
  if (editMode.value) {
    console.log('editando anotacion');
    console.log('anotacion', selectedAnnotationData.value.cod);
    response = await updateAnnotationFromApi(selectedAnnotationData.value);
  } else {
    console.log('añadiendo anotacion');
    console.log(selectedAnnotationData.value);
    response = await newAnnotation(selectedAnnotationData.value);
  }

  if (response) {
    loading.value = false;
    resetFromData();
    buttonModal();
    editMode.value = false;
    modalStored.response = true;
  } else {
    loading.value = false;
    error.value = true;
    errorMessages.value = 'Error al añadir la anotacion';
    modalStored.response = false;
  }
};

onMounted(async () => {
  loading.value = false;
  contactSelected.value = companyStored.selectedContact.contacto_n;
  selectedAnnotationData.value = annotationStored.getAnnotation;
  console.log('selectedAnnotationData', selectedAnnotationData.value);
  editMode.value = modalStored.getEditMode;
});

onBeforeMount(() => {
  loading.value = true;
});

watch(
  () => companyStored.getContactoSeleccionado,
  (value) => {
    contactSelected.value = value;
  },
);

watch(
  () => modalStored.getEditMode,
  (value) => {
    editMode.value = value;
  },
);
</script>
<template>
  <form @submit.prevent="onSubmit">
    <section class="header">
      <h2 v-if="modalStored.getEditMode">Editar anotación</h2>
      <h2 v-else>Añadir anotación</h2>
    </section>
    <section class="error">
      <p v-if="error">{{ errorMessages }}</p>
    </section>
    <section class="main">
      <section class="fieldset-group">
        <fieldset>
          <label for="anyo">Año {{ selectedAnnotationData.anyo }}</label>
          <input
            type="number"
            name="anyo"
            id="anyo"
            required
            min="2010"
            class="required"
            :placeholder="actualYear"
            v-model="selectedAnnotationData.year"
            @change="onChange"
          />
        </fieldset>
        <fieldset>
          <label for="fecha">Fecha</label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            min="2010"
            class="required"
            :placeholder="actualDay"
            v-model="selectedAnnotationData.date"
            @change="onChange"
          />
        </fieldset>
      </section>
      <section class="fieldset-group">
        <fieldset>
            <label for="tipo">Tipo</label>
            <select name="tipo" id="tipo" v-model="selectedAnnotationData.type">
              <option value="Teléfono" selected>Teléfono</option>
              <option value="Correo">Correo</option>
              <option value="Persona">Persona</option>
            </select>
          </fieldset>
          <fieldset class="checkbox">
            <label for="confirmado">Confirmado</label>
            <input
              type="checkbox"
              name="confirmado"
              id="confirmado"
              v-model="selectedAnnotationData.confirmed"
            />
          </fieldset>
      </section>
      <fieldset>
          <label for="funciones">Anotacion</label>
          <textarea
            name="funciones"
            id="funciones"
            cols="30"
            rows="10"
            v-model="selectedAnnotationData.annotation"
          ></textarea>
        </fieldset>
    </section>

    <RoundedButton
      :modal=true
      color="primary"
      class="contacts"
      @click="buttonModal"
    />
    <section class="button-group">
          <SubmitButton
            :idleText="editMode ? 'Editar' : 'Añadir'"
            :loading="loading"
            loadingText="Cargando"
          />
          <button type="button" class="cancel"  @click="buttonModal">
            Cancelar
          </button>
        </section>
  </form>
</template>
<style scoped>
button.add {
  position: absolute;
  transform: translate(405px, -580px);
}
section.fieldset-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
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
section.button-group {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
}
button.cancel {
  background-color: var(--button-background-hover);
  color: var(--color-text);
  border: 1px solid var(--button-background);

  border-radius: 2px;
  height: 48px;
}
</style>

<script setup>
import {
  ref, onMounted, onBeforeMount, watch,
} from 'vue';
import RoundedButton from '../buttons/roundedButton.vue';
import SubmitButton from '../buttons/submitButton.vue';
import companyStore from '../../store/perfilEmpresa';
import modalStore from '../../store/modal';
import userStore from '../../store/user';

const companyStored = companyStore();
const modalStored = modalStore();
const userStored = userStore();

const loading = ref(false);
const contactSelected = ref('');
// eslint-disable-next-line no-unused-vars
const contacts = ref(companyStored.getContactos);
const error = ref(false);
const errorMessages = ref('');

const actualDay = ref(new Date().toISOString().split('T')[0]);
const actualYear = ref(new Date().getFullYear());

const selectedAnnotationData = ref({
  anyo: actualYear.value,
  fecha: actualDay.value,
  tipo: '',
  descrip: '',
  contactoN: contactSelected.value,
  profesorDni: userStored.getUser,
});

const buttonModal = () => {
  modalStored.setShowModal(false);
};

onMounted(() => {
  loading.value = false;
  contactSelected.value = companyStored.getContactoSeleccionado;
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
</script>
<template>
  <form @submit.prevent="onSubmitNotes">
    <section class="header">
      <h2>Añadir anotación</h2>
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
            v-model="selectedAnnotationData.anyo"
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
            v-model="selectedAnnotationData.fecha"
            @change="onChange"
          />
        </fieldset>
      </section>
      <section class="fieldset-group">
        <fieldset>
            <label for="tipo">Tipo</label>
            <select name="tipo" id="tipo" v-model="selectedAnnotationData.tipo">
              <option value="Teléfono" selected>Teléfono</option>
              <option value="Correo">Correo</option>
              <option value="Persona">Persona</option>
            </select>
          </fieldset>
          <fieldset class="checkbox">
            <label for="verificado">Verificado</label>
            <input
              type="checkbox"
              name="verificado"
              id="verificado"
              v-model="selectedAnnotationData.verificado"
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
            v-model="selectedAnnotationData.anotacion"
          ></textarea>
        </fieldset>
    </section>

    <RoundedButton
      :modal="true"
      :class="{ modal: true }"
      class="contacts"
      @click="buttonModal"
    />
    <section class="button-group">
          <SubmitButton
            :idleText="editMode ? 'Editar' : 'Añadir'"
            :loading="loading"
            loadingText="Cargando"
          />
          <button type="button" class="cancel" @click="buttonModal">
            Cancelar
          </button>
        </section>
  </form>
</template>
<style scoped>
button.add {

  position: absolute;
  transform: translate(326px, -765px);
}
</style>

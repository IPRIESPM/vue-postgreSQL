<script setup>
import {
  ref, onMounted, onBeforeMount, watch,
} from 'vue';
import { useRouter } from 'vue-router';
import companyStore from '../../store/perfilEmpresa';
import modalStore from '../../store/modal';

import RoundedButton from '../buttons/roundedButton.vue';
import SubmitButton from '../buttons/submitButton.vue';
import ContactsFrom from '../companyProfile/ContactsFrom.vue';
import AnnotationsFrom from '../companyProfile/AnnotationsFrom.vue';
import ContactsModule from '../companyProfile/ContactsModule.vue';
import AnnotationsModule from '../companyProfile/AnnotationsModule.vue';
import LoadingText from '../loading/loadingText.vue';

import companyProfile from '../../controllers/api/companyProfile';
import {
  newPosition,
  updatePositionFromApi,
  deletePositionFromApi,
} from '../../controllers/api/positions';
import {
  getContactAnnotationFromApi,
  deleteAnnotationFromApi,
} from '../../controllers/api/annotations';

const router = useRouter();
const companyStored = companyStore();
const modalStored = modalStore();

const selectedCompany = ref('');
const rawData = ref('');
const profile = ref('');
const contacts = ref('');
const puestos = ref('');
const annotations = ref('');

const errorMessages = ref('');
const error = ref(false);

const actualYear = new Date().getFullYear();

const showModal = ref(modalStored.getShowModal);
const modalType = ref(modalStored.getModalType);

const selectedContact = ref({});

const loading = ref(false);

const editMode = ref(false);

const onChange = (event) => {
  event.target.setCustomValidity('');
};

const newContactData = ref({
  n: '',
  dni: '',
  nombre: '',
  correo: '',
  telefono: '',
  tipo: 'RRHH',
  principal: false,
  funciones: '',
  empresa: profile.value.cif,
});

const newPositionData = ref({
  anyo: actualYear,
  vacantes: '',
  horario: '',
  ciclo: 'DAW',
  descrip: ' ',
  cifEmpresa: selectedCompany,
  cod: '',
});

const resetContactFromData = () => {
  error.value = false;
  errorMessages.value = '';
  newContactData.value = {
    n: '',
    dni: '',
    nombre: '',
    correo: '',
    telefono: '',
    tipo: 'RRHH',
    principal: false,
    funciones: '',
    empresa: profile.value.cif,
  };

  newPosition.value = {
    anyo: actualYear,
    vacantes: '',
    horario: '',
    ciclo: 'DAW',
    descripción: '',
    cifEmpresa: selectedCompany,
    cod: '',
  };
};

const getCompanyProfile = async () => {
  console.log('Actualizando datos');
  loading.value = true;
  const profileApi = await companyProfile(companyStored.getEmpresaSelected);
  loading.value = false;
  rawData.value = profileApi;
  profile.value = profileApi.empresa;
  contacts.value = profileApi.contactos;
  puestos.value = profileApi.puestos;
  newContactData.value.empresa = profile.value.cif;
};

const buttonAdd = (type) => {
  if (type === 'close') {
    modalStored.setShowModal(false);
    modalType.value = '';
    editMode.value = false;
    resetContactFromData();
    return;
  }
  console.log('Añadiendo', type);
  console.log('edit', editMode.value);
  console.log('La empresa es:', profile.value.cif);
  modalStored.setShowModal(true);
  showModal.value = modalStored.getShowModal;
  modalType.value = type;
};

// const onSubmitContact = async (event) => {
//   event.preventDefault();
//   loading.value = true;

//   let response;
//   const inputNames = [
//     'nombre',
//     'correo',
//     'telefono'];
//   const inputCustomValidity = {
//     nombre: 'Debes introducir un nombre',
//     correo: 'Debes introducir un correo',
//     telefono: 'Debes introducir un teléfono',
//   };

//   inputNames.forEach((inputName) => {
//     const input = event.target.querySelector(`input[name="${inputName}"]`);
//     const inputValue = newContactData.value[inputName];
//     if (inputValue === '') {
//       input.setCustomValidity(inputCustomValidity[inputName]);
//     } else {
//       input.setCustomValidity('');
//     }
//   });
//   if (!event.target.checkValidity()) {
//     loading.value = false;
//     return;
//   }
//   if (editMode.value) {
//     newContactData.value.empresa = profile.value.cif;
//     response = await updateContactFromApi(newContactData.value);
//   } else {
//     response = await newContact(newContactData.value);
//   }
//   if (response) {
//     buttonAdd('close');
//     loading.value = false;
//     resetContactFromData();
//     await getCompanyProfile();

//     editMode.value = false;
//   } else {
//     loading.value = false;
//     errorMessages.value = 'Error al añadir el contacto';
//   }
// };

const onSubmitPositions = async (event) => {
  event.preventDefault();
  loading.value = true;

  const inputNames = ['anyo', 'vacantes', 'horario'];

  const inputCustomValidity = {
    anyo: 'Debes introducir un año ',
    vacantes: 'Debes introducir un número de vacantes',
    horario: 'Debes establecer un horario',
    ciclo:
      'El ciclo debe ser uno de los siguientes: FPB, SMR, DAM, DAW, ASIR, IMSA',
  };

  inputNames.forEach((inputName) => {
    const input = event.target.querySelector(`input[name="${inputName}"]`);
    const inputValue = newPositionData.value[inputName];
    if (inputValue === '') {
      input.setCustomValidity(inputCustomValidity[inputName]);
    } else {
      input.setCustomValidity('');
    }
  });

  if (!event.target.checkValidity()) {
    loading.value = false;
    return;
  }
  let response;
  if (editMode.value) {
    response = await updatePositionFromApi(newPositionData.value);
  } else {
    response = await newPosition(newPositionData.value);
  }

  console.log('respuesta del servidor', response);

  if (response) {
    buttonAdd('close');
    loading.value = false;
    resetContactFromData();
    await getCompanyProfile();
  } else {
    loading.value = false;
    errorMessages.value = 'Error al registrar el puesto';
    error.value = true;
  }
};

const editPosition = async (positionCod) => {
  console.log('editando', positionCod);
  newPositionData.value = {
    ...puestos.value.find((position) => position.cod === positionCod),
  };
  newPositionData.value.cif_company = profile.value.cif;
  newPositionData.value.cod = positionCod;

  console.log('editando', newPositionData.value);
  editMode.value = true;
  buttonAdd('puestos');
};
const editAnnotation = async (annotationCod) => {
  console.log('editando', annotationCod);
  editMode.value = true;
  modalStored.setEditMode(true);
  modalStored.setEditZone('annotation');
  companyStored.setSelectedAnnotation(annotationCod);
  buttonAdd('anotaciones');
};
// const deleteContact = async (contactN) => {
//   const response = await deleteContactFromApi(contactN);
//   if (response) {
//     await getCompanyProfile();
//   } else {
//     errorMessages.value = 'Error al eliminar el contacto';
//   }
// };

const deletePosition = async (positionCod) => {
  const response = await deletePositionFromApi(positionCod);
  if (response) {
    await getCompanyProfile();
  } else {
    errorMessages.value = 'Error al eliminar el puesto';
  }
};

const updateAnnotations = async () => {
  loading.value = true;
  console.log('actualizando anotaciones');
  annotations.value = await getContactAnnotationFromApi(
    selectedContact.value.n,
  );
  // companyStored.updateAnnotations(annotations.value);
  loading.value = false;
};

const deleteAnnotation = async (annotationCod) => {
  loading.value = true;
  const response = await deleteAnnotationFromApi(annotationCod);

  if (!response) {
    console.log('Error al eliminar la anotación');
  }
  updateAnnotations();
  loading.value = false;
};

onBeforeMount(async () => {
  if (companyStored.getEmpresaSelected === '') {
    router.push({ name: 'empresas' });
  }
});

onMounted(async () => {
  if (companyStored.getEmpresaSelected !== '') {
    loading.value = true;
    selectedCompany.value = await companyProfile(
      companyStored.getEmpresaSelected,
    );
    companyStored.updateEmpresa(selectedCompany.value);
    await getCompanyProfile();
    companyStored.setSelectedContact(companyStored.getPrincipalContact.n);
    companyStored.profesor = selectedCompany.value.empresa.dni_profesor;
    loading.value = false;
  }
});

watch(
  () => modalStored.getShowModal,
  (value) => {
    console.log('[watch] modal', value);
    showModal.value = value;
    modalType.value = modalStored.getModalType;
    if (showModal.value === false) {
      buttonAdd('close');
    }
  },
);
</script>

<template>
  <section
    class="modal"
    v-if="showModal"
    :class="{ 'is-active': showModal }"
    :key="showModal"
  >
    <section class="modal-main">

      <ContactsFrom v-if="modalType == 'contacts'" />
      <AnnotationsFrom v-if="modalType == 'annotations'" />

      <form v-if="modalType === 'puestos'" @submit="onSubmitPositions">
        <section class="header">
          <h2 v-if="editMode">Editar puesto</h2>
          <h2 v-else>Añadir nuevos puestos</h2>
        </section>
        <section class="error">
          <p v-if="error">{{ errorMessages }}</p>
        </section>
        <section class="main">
          <section class="fieldset-group">
            <fieldset>
              <label for="anyo">Año {{ newPositionData.anyo }}</label>
              <input
                type="number"
                name="anyo"
                id="anyo"
                required
                min="2010"
                class="required"
                :placeholder="actualYear"
                v-model="newPositionData.anyo"
                @change="onChange"
              />
            </fieldset>
            <fieldset>
              <label for="vacantes">Vacantes</label>
              <input
                type="number"
                name="vacantes"
                id="vacantes"
                class="required"
                placeholder="15"
                min="0"
                @change="onChange"
                v-model="newPositionData.vacantes"
              />
            </fieldset>
          </section>

          <section class="fieldset-group">
            <fieldset>
              <label for="correo">Horario</label>
              <input
                type="text"
                name="horario"
                id="horario"
                class="required"
                @change="onChange"
                placeholder="9:00 - 14:00"
                v-model="newPositionData.horario"
              />
            </fieldset>
            <fieldset>
              <label for="ciclo">Ciclo</label>
              <select name="ciclo" id="ciclo" v-model="newPositionData.ciclo">
                <option value="FPB">FPB</option>
                <option value="SMR" selected>SMR</option>
                <option value="DAM">DAM</option>
                <option value="DAW">DAW</option>
                <option value="ASIR">ASIR</option>
                <option value="IMSA">IMSA</option>
              </select>
            </fieldset>
          </section>
        </section>

        <fieldset>
          <label for="descrip">Descripción <small>200 max</small></label>
          <textarea
            name="descrip"
            id="descrip"
            cols="30"
            rows="10"
            maxlength="200"
            v-model="newPositionData.descrip"
          >
          </textarea>
        </fieldset>

        <section class="button-group">
          <SubmitButton
            :idle-text="editMode ? 'Editar' : 'Añadir'"
            :loading="loading"
            loadingText="Cargando"
          />
          <button type="button" class="cancel" @click="buttonAdd('close')">
            Cancelar
          </button>
          <RoundedButton
            :modal="showModal"
            :class="{ modal: showModal }"
            class="position"
            @click="buttonAdd('close')"
          />
        </section>
      </form>

      <AnnotationsFrom v-if="modalType === 'anotaciones'" />
    </section>
  </section>
  <section class="main" v-else-if="!loading">
    <header>
      <h1>{{ profile.nombre }} - {{ profile.cif }}</h1>
      <span>
        Profesor responsable:
        {{ profile.nombre_profesor }}
      </span>
    </header>

    <section class="empresa">
      <p>
        <font-awesome-icon :icon="['fas', 'building']" />
        {{ profile.direccion }} {{ profile.localidad }}, {{ profile.comunidad }}
      </p>
    </section>
    <section class="contacts">
      <ContactsModule />
    </section>
    <section class="annotations"></section>
    <section class="puestos">
      <header>
        <h2>Puestos</h2>
        <RoundedButton
          :modal="showModal"
          :shadow="false"
          @click="buttonAdd('puestos')"
        />
      </header>
      <table class="table positions" v-if="puestos && puestos.length > 0">
        <thead>
          <tr>
            <th>Año</th>
            <th>Horario</th>
            <th>Ciclo</th>
            <th>Vacantes</th>
            <th>Descripción</th>
            <th class="empty">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="puesto in puestos" :key="puesto.cod">
            <td>{{ puesto.anyo }}</td>
            <td>{{ puesto.horario }}</td>
            <td>{{ puesto.ciclo }}</td>
            <td>{{ puesto.vacantes }}</td>
            <td>{{ puesto.descrip }}</td>
            <td class="icons">
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                @click="editPosition(puesto.cod)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="deletePosition(puesto.cod)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <section class="noData" v-else>
        <header>
          <p>No hay puestos 😢</p>
        </header>
      </section>
    </section>
  </section>
  <LoadingText v-else />
</template>

<style scoped>
section.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
}

section.empresa {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

section.noData {
  text-align: center;
}

p.encargado {
  display: flex;
  align-items: center;
  gap: 1rem;
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

button.cancel {
  background-color: var(--button-background-hover);
  color: var(--color-text);
  border: 1px solid var(--button-background);

  border-radius: 2px;
  height: 48px;
}

section.contact-data {
  width: 100%;
  display: flex;
}

section.anotaciones {
  padding: 0.5rem;
}

section.contact-data h3 {
  font-size: 0.9rem;
}

table {
  border: none;
  border-collapse: collapse;
}

td,
th {
  padding-left: 0.5rem;
  column-gap: 15px;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
}

header span {
  display: flex;
  gap: 0.5em;
}

button.add.annotations {
  position: absolute;
  transform: translate(400px, -700px);
}
button.add.position {
  position: absolute;
  transform: translate(240px, -690px);
}
button.add.contacts {
  position: absolute;
  transform: translate(240px, -800px);
}
section.error {
  color: var(--color-error);
  text-align: center;
  margin-bottom: 1rem;
  height: 30px;
}
table.table.positions {
  text-align: center;
}
td.selected {
  background: var(--color-background-soft);
}

.icons svg {
  cursor: pointer;
}
</style>

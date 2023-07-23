<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <header>
      <button
        class="update"
        @click="updateButton"
        :class="{ 'disable': updating }"
      >
        <p>Actualizar</p>
        <p :class="{ 'rotate': updating }">
          <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
        </p>
      </button>
    </header>
    <section class="loading" v-if="loading">
      Cargando <div class="loading"></div>
    </section>
    <section class="tableData" v-else-if="localData && localData.length > 0">
      <table>
        <thead>
          <tr>
            <th>Cif</th>
            <th>Empresa</th>
            <th>Profesor Encargado</th>
            <th>Localidad</th>
            <th class="empty">Opciones</th>
          </tr>
        </thead>
        <tbody>

            <tr v-for="company in localData" :key="company.cif">
              {{ company[0] }}

              <td :class="{ 'empty': !company.cif }">
              <span>{{ company.cif }}</span>
            </td>
              <td
                class="underline"
                :class="{ 'empty': !company.nombre }" @click="goProfile(company.cif)"
              >
              <span>
                <font-awesome-icon :icon="['fas', 'address-card']" />
                {{ company.nombre }}
              </span>
            </td>
            <td>
              <span>{{ company.nombre_profesor ? company.nombre_profesor : '-' }}</span>
            </td>
            <td :class="{ 'empty': !company.localidad }">
              <span>{{ company.localidad }}</span>
            </td>

            <td class="icons">
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                @click="editFormData(company.cif)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="deleteFormData(company.cif)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="noData" v-else>
      <p>No hay datos 😢</p>
    </section>
    <section class="modal" :class="{ 'is-active': modal }">
      <form id="modalForm" @submit.prevent="onSubmit">
        <h3>{{ modalOption === 'edit' ? 'Editando' : 'Nuevo' }}</h3>
        <section class="error-message" :class="{ 'show': submitError }">
          <p>{{ errorMessage }}</p>
        </section>
        <section class="container">
          <section class="personal">
            <fieldset>
              <label for="cif">Cif</label>
              <input
                type="text"
                name="cif"
                id="cif"
                placeholder="A12345678"
                v-model="dataSelected.cif"
                @change="onChange"
              >
            </fieldset>
            <fieldset>
              <label for="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Empresa S.L."
                v-model="dataSelected.nombre"
                @change="onChange"
              >
            </fieldset>
            <fieldset>
              <label for="telefono">Telefono</label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="965331234"
                v-model="dataSelected.telefono"
              >
            </fieldset>
          </section>
          <section class="contact">
            <fieldset>
              <label for="direccion">Direccion</label>
              <input
                type="text"
                name="direccion"
                id="direccion"
                placeholder="Calle de la piruleta, 123"
                v-model="dataSelected.direccion"
              >
            </fieldset>

            <fieldset>
              <label for="localidad">Localidad</label>
              <input
                type="text"
                name="localidad"
                id="localidad"
                placeholder="Petrer"
                v-model="dataSelected.localidad"
              >
            </fieldset>
            <fieldset>
              <label for="comunidad">Comunidad</label>
              <input
                type="text"
                name="comunidad"
                id="comunidad"
                placeholder="Alicante"
                v-model="dataSelected.comunidad"
              >
            </fieldset>
          </section>
          <section>

            <fieldset>
              <label for="profesor">Profesor a cargo</label>
              <select
                name="profesor" id="profesor"
                v-if="teachersData.length !== 0"
                @change="onChange"
              >
                <option :value="teacher.dni"

                  v-if="modalOption !== 'edit'"
                  v-for="teacher in teachersData"
                  :key="teacher.dni"
                  :selected="teacher.dni === storedUser.dni">
                    {{ teacher.nombre }}
                  </option>
                  <option :value="teacher.dni"
                  v-else
                  v-for="teacher in teachersData"
                  :key="teacher.dni + 1 * 23"
                  :selected="teacher.dni === dataSelected.dni_profesor">
                    {{ teacher.nombre }}
                  </option>

              </select>
              <LoadingText
                v-else
                :loading="true"
                loadingText="Cargando profesores"
              />
            </fieldset>
          </section>
          <section class="buttons">
            <submitButton
              :loading="submitLoading"
              idleText="Guardar"
              loadingText="Cargando"
              v-if="teachersData.length !== 0"

            />
          </section>
        </section>
      </form>
      <button type="button" class="add variant" @click="buttonAdd">
        <font-awesome-icon v-if="modal" :icon="['fas', 'xmark']" />
        <font-awesome-icon v-else :icon="['fas', 'plus']" />
      </button>
    </section>
    <button type="button" class="add" @click="buttonAdd">
      <font-awesome-icon v-if="modal" :icon="['fas', 'xmark']" />
      <font-awesome-icon v-else :icon="['fas', 'plus']" />
    </button>
  </template>

<script setup>
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { getAllData, editData, deleteData } from '../../controllers/data';
import { newCompany } from '../../controllers/api/companys';
import submitButton from '../buttons/submitButton.vue';
import LoadingText from '../loading/loadingText.vue';
import profesoresStore from '../../store/profesores';
import companyStore from '../../store/empresas';
import userStore from '../../store/user';
import profileStore from '../../store/perfilEmpresa';

const router = useRouter();
const companyStored = companyStore();
const userStored = userStore();
const teacherStored = profesoresStore();
const profileStored = profileStore();

const storedUser = ref({});

const loading = ref(true);
const updating = ref(false);
const localData = ref([]);
const teachersData = ref([]);
const dataSelected = ref({});

const submitError = ref(false);
const submitLoading = ref(false);

const errorMessage = ref('');
const modal = ref(false);
const modalOption = ref('');

const edit = ref(null);

async function updateData(force = false) {
  console.log('he conseguido entrar en updateData');
  if (force) {
    console.log('Forzando actualización de datos');
  }
  await getAllData('companys', force);
  console.log('Actualizando datos');
  const listadoLocal = companyStored.getEmpresas;
  console.log('los datos son:');
  console.log('los datos son:', listadoLocal);

  localData.value = companyStored.getEmpresas.listado;

  loading.value = false;
}

function resetForm() {
  submitError.value = false;
  errorMessage.value = '';
  const form = document.querySelector('#modalForm');
  form.reset();
  dataSelected.value = {};
  form.classList.remove('bounce');
  const formInputs = document.querySelectorAll('#modalForm input:not([type="submit"])');
  formInputs.forEach((input) => {
    input.setCustomValidity('');
  });
}

const showHideModal = async () => {
  modal.value = !modal.value;
  if (modal.value) {
    console.log('actualizando profesores: ');
    await getAllData('teachers', 'force');
    teachersData.value = teacherStored.getProfesores.listado;
  }

  resetForm();
};

function editFormData(id) {
  if (edit.value === id) {
    edit.value = null;
  } else {
    edit.value = id;
    showHideModal();
    modalOption.value = 'edit';
    dataSelected.value = { ...localData.value.find((company) => company.cif === id) };
  }
}

async function deleteFormData(id) {
  console.log('Eliminando: ', id);
  loading.value = true;
  await deleteData('companys', id);
  await updateData();
  loading.value = false;
}

const updateButton = async () => {
  updating.value = true;
  await updateData(true);
  updating.value = false;
};

const buttonAdd = () => {
  showHideModal();
  if (modal.value) {
    modalOption.value = 'add';
    dataSelected.value = {};
  }
};

const onChange = (event) => {
  event.target.setCustomValidity('');
};

const onSubmit = async (event) => {
  event.preventDefault();
  submitLoading.value = true;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  let responseData;

  if (modalOption.value === 'edit') {
    responseData = await editData('companys', data);
    if (responseData) {
      event.target.classList.add('bounce');
      errorMessage.value = 'Error al Actualizar';
      modal.value = false;
    }
    updateData(true);
    getAllData('teachers', 'force');
    teachersData.value = teacherStored.getProfesores.listado;

    submitLoading.value = false;
  } else {
    const inputNames = ['cif', 'nombre'];
    const inputCustomValidity = {
      cif: 'Tiene que ser un cif válido',
      nombre: 'Tienes que introducir un nombre',
      profesor: 'Selecciona un profesor',
    };
    const select = event.target.querySelector('select[name="profesor"]');
    if (!select.value) {
      select.setCustomValidity(inputCustomValidity.profesor);
      submitError.value = true;
      submitLoading.value = false;
      event.target.classList.add('bounce');
    } else {
      select.setCustomValidity('');
    }
    inputNames.forEach((inputName) => {
      const input = event.target.querySelector(`input[name="${inputName}"]`);

      if (!input.value) {
        input.setCustomValidity(inputCustomValidity[inputName]);
        submitError.value = true;
        submitLoading.value = false;
        event.target.classList.add('bounce');
      } else {
        input.setCustomValidity('');
      }
    });

    if (submitError.value) {
      console.log('Hay errores en el formulario');
      return;
    }

    console.log('Estoy creando una nueva empresa');
    responseData = await newCompany(data);
    if (responseData) {
      console.log('La empresa se ha creado correctamente');
      submitLoading.value = false;
      console.log('Actualizando datos');
      updateData(true);
      console.log('Datos actualizados');
      modal.value = false;
    } else {
      errorMessage.value = 'Error al añadir';
      submitError.value = true;
      submitLoading.value = false;
      loading.value = false;
      event.target.classList.add('bounce');
    }
  }
};

const goProfile = (cif) => {
  console.log('cif: ', cif);
  profileStored.selectEmpresa(cif);
  console.log('La empresa seleccionada es:', profileStored.getEmpresaSelected);
  router.push({ name: 'empresa' });
};

onMounted(async () => {
  storedUser.value = await userStored.getUser;

  await updateData();
  const formInputs = document.querySelectorAll('#modalForm input:not([type="submit"])');
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      submitError.value = false;
    });
  });
});
</script>

<style scoped>
section.tableData {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section.tableData table thead {
  color: var(--color-text-muted);
  text-align: left;
  margin-bottom: 0.5rem;
  /* Add margin-bottom to create space */
}

table thead th {
  font-weight: inherit;
  border-bottom: 1px solid var(--color-text-muted);
  text-align: left;
}

section.tableData table tbody td {
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-text-muted);
}

button.add {
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  width: 50px;
  height: 52px;

  border-radius: 100%;
  outline: none;
  border: none;

  background-color: var(--color-background-soft);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

button.add.variant {
  position: relative;
  top: -259px;
  border-radius: 100%;
  outline: none;
  border: none;

  background-color: var(--color-background);
}

header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

button.update {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;

}
section.modal {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

}

section.modal.is-active {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  width: max-content;
  padding: 15px;
  background: var(--color-background-soft);

  border: 1px solid black;
  border-radius: 5px;
}

section.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section.personal,
section.contact {
  display: flex;
  flex-direction: row;
}

section.contrasena {
  display: flex;
  flex-direction: column;
  align-items: center;
}

section.personal fieldset,
section.contact fieldset,
section.contrasena fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

section.buttons {
  display: flex;
  justify-content: space-between;
  align-self: center;
}

section.buttons input[type="button"] {
  background-color: aliceblue;
}

section.loading,
section.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

section.noData {
  height: 100%;
}

td {
  height: 30px;
}

td.icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

td.empty,
th.empty {
  color: var(--color-text-muted);
  text-align: center;
}

td span {
  width: 100%;
}

td input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  font-size: inherit;
  color: inherit;
  border-bottom: 1px solid var(--color-text-muted);
}

section.editZone {
  display: flex;
  gap: 1rem;
}

.bounce {
  animation: bounce 0.5s 1 linear forwards;
}
</style>

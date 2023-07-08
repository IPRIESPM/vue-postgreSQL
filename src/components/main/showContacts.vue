<template>
    <header>
      <button
        class="update"
        @click="updateButton"
        :class="{'disable' : updating}"
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
    <section class="tableData" v-else-if="localData.length > 0">
      <table>
        <thead>
          <tr>
            <th>Docente</th>
            <th>Correo electrónico</th>
            <th>Teléfono</th>
            <th>Dni</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="teacher in localData" :key="teacher.cif">
            <td :class="{ 'empty': !teacher.nombre }">
              <span>{{ teacher.nombre }}</span>
            </td>
            <td :class="{ 'empty': !teacher.correo }">
              <span>{{ teacher.correo ? teacher.correo : '-' }}</span>
            </td>
            <td :class="{ 'empty': !teacher.telefono }">
              <span>{{ teacher.telefono }}</span>
            </td>
            <td :class="{ 'empty': !teacher.dni }">
              <span>{{ teacher.dni }}</span>
            </td>
            <td class="icons" v-if="teacher.dni !== storedUser.dni">
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                @click="editFormData(teacher.dni)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="deleteFormData(teacher.dni)"
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
              <label for="dni">Dni</label>
              <input
                type="text"
                name="dni"
                id="dni"
                placeholder="A12345678"
                v-model.lazy="dataSelected.dni"
                required
              >
            </fieldset>
            <fieldset>
              <label for="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Alejandro"
                required
                v-model.lazy="dataSelected.nombre"
              >
            </fieldset>
            <fieldset>
              <label for="correo">Correo electrónico</label>
              <input
                type="text"
                name="correo"
                id="correo"
                placeholder="example@example.com"
                required
                v-model.lazy="dataSelected.correo"
              >
            </fieldset>
          </section>
          <section class="contact">
            <fieldset>
              <label for="telefono">Telefono</label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="965331234"
                required
                v-model.lazy="dataSelected.telefono"
              >
            </fieldset>

            <fieldset>
              <label for="tipo">Tipo</label>
              <select name="tipo" id="tipo">
                <option value="gerente">Gerente</option>
                <option value="jefe-proyecto">Jefe de proyecto</option>
                <option value="tecnico">Técnico</option>
                <option value="tutor">Tutor</option>
                <option value="rrhh">RRHH</option>
              </select>
            </fieldset>

            <fieldset>
              <label for="principal"></label>
              <p><input type="checkbox" name="principal" id="principal"> Principal</p>
            </fieldset>
            <fieldset>
              <label for="empresa">Empresa</label>
              <select name="company" id="company">
                <option v-for="company in companies" :key="company.cif" >
                 {{ company.nombre  }}
                </option>
              </select>
            </fieldset>

          </section>
          <section class="contact">
            <fieldset>
              <label for="funciones">Funciones</label>
              <textarea name="" id="" cols="87" rows="10"></textarea>
            </fieldset>
          </section>
          <section class="buttons">
            <submitButton
              :loading="submitLoading"
              idleText="Guardar"
              loadingText="Cargando"
            />
          </section>
        </section>
      </form>
      <button type="button" class="add variant" @click="buttonAdd">
        <font-awesome-icon v-if="modal" :icon="['fas', 'minus']" />
        <font-awesome-icon v-else :icon="['fas', 'plus']" />
      </button>
    </section>

    <button type="button" class="add" @click="buttonAdd">
      <font-awesome-icon v-if="modal" :icon="['fas', 'minus']" />
      <font-awesome-icon v-else :icon="['fas', 'plus']" />
    </button>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllData, editData, deleteData } from '../../controllers/data';
import { addLocalStorage, getLocalStorage } from '../../controllers/localStorage';
import { newContact } from '../../controllers/api/contacts';
import submitButton from '../submitButton.vue';
import { getUserLocalStorage } from '../../controllers/session';

const storedUser = ref({});

const loading = ref(true);
const updating = ref(false);
const localData = ref([]);
const newData = ref(false);
const dataSelected = ref({});

const companies = ref([]);

const submitError = ref(false);
const submitLoading = ref(false);

const errorMessage = ref('');
const modal = ref(false);
const modalOption = ref('');

const edit = ref(null);

async function updateData(force = false) {
  if (force) {
    console.log('Forzando actualización de datos');
  }
  const dataUpdated = await getAllData('contacts', force);

  localData.value = dataUpdated.data;
  loading.value = false;
}

function editFormData(id) {
  if (edit.value === id) {
    edit.value = null;
  } else {
    edit.value = id;
    modal.value = true;
    modalOption.value = 'edit';
    dataSelected.value = localData.value.find((contact) => contact.dni === id);
  }
}

async function deleteFormData(id) {
  console.log('Eliminando: ', id);
  loading.value = true;
  const dataUpdated = await deleteData('contacts', id);
  console.log('data: ', dataUpdated.data);
  if (!dataUpdated.data) localData.value = [];
  localData.value = dataUpdated.data;
  loading.value = false;
}

const updateButton = async () => {
  updating.value = true;
  await updateData(true);
  updating.value = false;
};

const buttonAdd = () => {
  modal.value = !modal.value;
  if (modal.value) {
    modalOption.value = 'add';
  }
};

const onSubmit = async (event) => {
  event.preventDefault();
  submitLoading.value = true;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  let responseData;

  if (modalOption.value === 'edit') {
    responseData = await editData('contacts', data);
    console.log('responseData:', responseData);
    if (responseData) {
      localData.value = responseData.data;
      event.target.classList.add('bounce');
      errorMessage.value = 'Error al Actualizar al contacto';
      modal.value = false;
    }
    submitLoading.value = false;
  } else {
    responseData = await newContact(data);
    if (responseData) {
      localData.value.push(responseData);
      console.log('responseData:', responseData);
      await addLocalStorage(responseData, 'contacts');
      newData.value = false;
      submitLoading.value = false;
      modal.value = false;
    } else {
      errorMessage.value = 'Error al añadir al contacto';
      submitError.value = true;
      submitLoading.value = false;
      loading.value = false;
      event.target.classList.add('bounce');
    }
  }
};

onMounted(async () => {
  storedUser.value = await getUserLocalStorage();
  await updateData();
  const formInputs = document.querySelectorAll('#modalForm input:not([type="submit"])');
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      submitError.value = false;
    });
  });
  const data = getLocalStorage('companys');
  console.log('data:', data.data);
  companies.value = data.data;
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
}

button.add.variant {
    position: relative;
    top: -310px;
    border-radius: 100%;
    outline: none;
    border: none;
}
header{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
}
button.update{
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

form{
        width: max-content;
        padding: 15px;
        background: var(--color-background-soft);

        border: 1px solid black;
        border-radius: 5px;
    }

    section.container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    section.personal,
    section.contact{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    section.personal fieldset,
    section.contact fieldset{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
    }
    section.buttons{
        display: flex;
        justify-content: space-between;
        align-self: center;
    }

    section.buttons input[type="button"]{
        background-color: aliceblue;
    }
    section.loading,
    section.noData{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    section.noData{
        height: 100%;
    }
    td{
        height: 30px;
    }
    td.icons{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    td.empty{
        color: var(--color-text-muted);
        text-align: center;
    }
    td span{
        width: 100%;
    }
    td input{
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
    section.editZone{
        display: flex;
        gap: 1rem;
    }
    .bounce{
          animation: bounce 0.5s 1 linear forwards;
        }

</style>

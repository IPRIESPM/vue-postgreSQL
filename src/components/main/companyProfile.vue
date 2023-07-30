<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import companyStore from '../../store/perfilEmpresa';
import companyProfile from '../../controllers/api/companyProfile';
import StandardButton from '../buttons/standardButton.vue';
import RoundedButton from '../buttons/roundedButton.vue';
import SubmitButton from '../buttons/submitButton.vue';
import {
  newContact,
  updateContactFromApi,
  deleteContactFromApi,
} from '../../controllers/api/contacts';
import { newPosition, updatePositionFromApi, deletePositionFromApi } from '../../controllers/api/positions';
import LoadingText from '../loading/loadingText.vue';

const router = useRouter();
const companyStored = companyStore();

const selectedCompany = ref('');
const rawData = ref('');
const profile = ref('');
const contacts = ref('');
const puestos = ref('');

const errorMessages = ref('');
const error = ref(false);

const actualYear = new Date().getFullYear();
const fechaActual = ref(new Date().toISOString().split('T')[0]);

const showModal = ref(false);
const modalType = ref('');
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

const newAnnotationData = ref({
  codigo: actualYear,
  contacto: '',
  profesor_dni: '',
  anyo: actualYear,
  tipo: 'telefono',
  confirmado: '',
  anotacion: '',
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
  const profileApi = await companyProfile(companyStored.getEmpresaSelected);
  rawData.value = profileApi;
  profile.value = profileApi.empresa;
  contacts.value = profileApi.contactos;
  puestos.value = profileApi.puestos;
  newContactData.value.empresa = profile.value.cif;
};

const buttonAdd = (type) => {
  if (type === 'close') {
    showModal.value = false;
    modalType.value = '';
    editMode.value = false;
    resetContactFromData();
    return;
  }
  console.log('La empresa es:', profile.value.cif);
  showModal.value = true;
  modalType.value = type;
};

const onSubmitContact = async (event) => {
  event.preventDefault();
  loading.value = true;

  let response;
  const inputNames = [
    'nombre',
    'correo',
    'telefono'];
  const inputCustomValidity = {
    nombre: 'Debes introducir un nombre',
    correo: 'Debes introducir un correo',
    telefono: 'Debes introducir un teléfono',
  };

  inputNames.forEach((inputName) => {
    const input = event.target.querySelector(`input[name="${inputName}"]`);
    const inputValue = newContactData.value[inputName];
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
  if (editMode.value) {
    newContactData.value.empresa = profile.value.cif;
    response = await updateContactFromApi(newContactData.value);
  } else {
    response = await newContact(newContactData.value);
  }
  if (response) {
    buttonAdd('close');
    loading.value = false;
    resetContactFromData();
    await getCompanyProfile();

    editMode.value = false;
  } else {
    loading.value = false;
    errorMessages.value = 'Error al añadir el contacto';
  }
};

const onSubmitPositions = async (event) => {
  event.preventDefault();
  loading.value = true;

  const inputNames = [
    'anyo',
    'vacantes',
    'horario'];

  const inputCustomValidity = {
    anyo: 'Debes introducir un año ',
    vacantes: 'Debes introducir un número de vacantes',
    horario: 'Debes establecer un horario',
    ciclo: 'El ciclo debe ser uno de los siguientes: FPB, SMR, DAM, DAW, ASIR, IMSA',
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

const onSubmitNotes = async (event) => {
  event.preventDefault();
  loading.value = true;

  const response = await newPosition(newPositionData.value);
  console.log('respuesta del servidor', response);

  const inputNames = [
    'anyo',
    'fecha'];

  const inputCustomValidity = {
    anyo: 'El año debe ser mayor a 2010',
    fecha: 'Debes introducir una fecha',
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

  if (response) {
    buttonAdd('close');
    loading.value = false;
    resetContactFromData();
    await getCompanyProfile();
  } else {
    loading.value = false;
    errorMessages.value = 'Error al registrar la anotación';
    error.value = true;
  }
};

const editContact = async (contactN) => {
  newContactData.value = {
    ...contacts.value.find((contact) => contact.n === contactN),
  };
  editMode.value = true;
  buttonAdd('contactos');
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

const deleteContact = async (contactN) => {
  const response = await deleteContactFromApi(contactN);
  if (response) {
    await getCompanyProfile();
  } else {
    errorMessages.value = 'Error al eliminar el contacto';
  }
};

const deletePosition = async (positionCod) => {
  const response = await deletePositionFromApi(positionCod);
  if (response) {
    await getCompanyProfile();
  } else {
    errorMessages.value = 'Error al eliminar el puesto';
  }
};

onBeforeMount(() => {
  if (companyStored.getEmpresaSelected === '') {
    router.push({ name: 'empresas' });
  }
});

onMounted(async () => {
  if (companyStored.getEmpresaSelected !== '') {
    loading.value = true;
    selectedCompany.value = companyStored.getEmpresaSelected;
    await getCompanyProfile();
    loading.value = false;
  }
});

</script>

<template>
  <section class="modal" v-if="showModal" :class="{ 'is-active': showModal }">
    <section class="modal-main">

      <form v-if="modalType === 'contactos'" @submit="onSubmitContact">

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
                v-model="newContactData.dni"
              />
            </fieldset>
            <fieldset>
              <label for="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Silvia Amorós"
                v-model="newContactData.nombre"
                class="required"
                autofocus
              />
            </fieldset>
          </section>

          <section class="fieldset-group">
            <fieldset>
              <label for="correo">Correo</label>
              <input
                type="email"
                name="correo"
                id="correo"
                placeholder="example@example"
                class="required"
                v-model="newContactData.correo"
              />
            </fieldset>

            <fieldset>
              <label for="telefono">Telefono</label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                class="required"
                placeholder="612345678"
                v-model="newContactData.telefono"
              />
            </fieldset>
          </section>
        </section>
        <section class="fieldset-group">
          <fieldset>
            <label for="tipo">Tipo</label>
            <select name="tipo" id="tipo" v-model="newContactData.tipo">
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
              v-model="newContactData.principal"
            />
          </fieldset>
        </section>

        <fieldset>
          <label for="funciones">Funciones</label>
          <textarea
            name="funciones"
            id="funciones"
            cols="30"
            rows="10"
            v-model="newContactData.funciones"
          ></textarea>
        </fieldset>

        <section class="button-group">
          <SubmitButton
            :idleText="editMode ? 'Editar' : 'Añadir'"
            :loading="loading"
            loadingText="Cargando"
          />
          <button type="button" class="cancel" @click="buttonAdd('close')">
            Cancelar
          </button>
          <RoundedButton
            :modal=showModal
            :class="{ 'modal': showModal }"
            class="contacts"
            @click="buttonAdd('close')"/>
        </section>
      </form>

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
            :modal=showModal
            :class="{ 'modal': showModal }"
            class="position"
            @click="buttonAdd('close')"/>
        </section>
      </form>

      <form v-if="modalType === 'anotaciones'" @submit.prevent="onSubmitNotes">
        <section class="header">
          <h2>Añadir anotación</h2>
        </section>
        <section class="main">
          <section class="fieldset-group">
            <fieldset>
              <label for="anyo">Año {{ newAnnotationData.anyo }}</label>
              <input
                type="number"
                name="anyo"
                id="anyo"
                required
                min="2010"
                :placeholder="actualYear"
                v-model="newAnnotationData.anyo"
              />
            </fieldset>
            <fieldset>
              <label for="fecha">Fecha</label>
              <input
                type="date"
                name="fecha"
                id="fecha_actual"
                :value="fechaActual"
                required
              />
            </fieldset>
          </section>

          <section class="fieldset-group">
            <fieldset>
              <label for="tipo">Tipo</label>
              <select name="tipo" id="tipo" v-model="newAnnotationData.tipo">
                <option value="telefono">Telefono</option>
                <option value="correo">Correo</option>
                <option value="persona">Persona</option>
              </select>
            </fieldset>

            <fieldset class="checkbox">
            <label for="confirmado">Confirmado</label>
            <input
              type="checkbox"
              name="confirmado"
              id="confirmado"
              v-model="newPositionData.co"
            />
          </fieldset>
          </section>
        </section>

        <fieldset>
          <label for="descrip">Anotación</label>
          <textarea name="descrip" id="descrip" cols="30" rows="10"></textarea>
        </fieldset>

        <section class="button-group">
          <StandardButton idleText="añadir" />
          <button type="button" class="cancel" @click="buttonAdd('close')">
            Cancelar
          </button>
        </section>
        <RoundedButton
            :modal=showModal
            :class="{ 'modal': showModal }"
            class="annotations"
            @click="buttonAdd('close')"
          />
      </form>

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
      <header>
        <h2>Contactos</h2>
        <RoundedButton
          :modal=false
          @click="buttonAdd('contactos')"
          :shadow=false
        />
      </header>
      <section class="contact-data" v-if="contacts && contacts.length > 0">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th class="empty">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.n">
              <td>{{ contact.nombre }}</td>
              <td>{{ contact.telefono }}</td>
              <td>{{ contact.correo }}</td>
              <td class="icons">
                <font-awesome-icon
                  :icon="['fas', 'pen-to-square']"
                  @click="editContact(contact.n)"
                />
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  @click="deleteContact(contact.n)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <section class="anotaciones">
          <header>
          <h3>Anotaciones</h3>
          <RoundedButton
            :shadow=false
            :modal=showModal
            @click="buttonAdd('anotaciones')"
            size="sm"
          />
        </header>
          <section
            v-if="profile.anotaciones"
            class="anotaciones-data"
          >
            <p>{{ profile.anotaciones }}</p>
          </section>
          <section v-else class="noData">No hay anotaciones 😢</section>
          <p>{{ profile.anotaciones }}</p>
        </section>
      </section>
      <section class="noData" v-else>
        <p>No hay contactos 😢</p>
      </section>
    </section>
    <section class="puestos">
      <header>
        <h2>Puestos</h2>
        <RoundedButton
          :modal=showModal
          :shadow=false
          @click="buttonAdd('puestos')"/>
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
            <td >{{ puesto.anyo }}</td>
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

button.add.contacts{
  position: absolute;
  transform: translate(241px, -795px);
}
button.add.annotations{
  position: absolute;
  transform: translate(400px, -700px);
}
button.add.position{
  position: absolute;
  transform: translate(240px, -690px);
}
section.error {
  color: var(--color-error);
  text-align: center;
  margin-bottom: 1rem;
  height: 30px;
}
table.table.positions{
  text-align: center;
}
</style>

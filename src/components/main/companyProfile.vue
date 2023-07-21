<template>
  <section class="modal" v-if="showModal" :class="{ 'is-active': showModal }">
    <section class="modal-main">
      <form v-if="modalType === 'contactos'" @submit="onSubmitContact">
        <section class="header">
          <h2 v-if="editMode">Editar contacto</h2>
          <h2 v-else>Añadir nuevo contacto</h2>
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
                v-model="newContactData.correo"
              />
            </fieldset>

            <fieldset>
              <label for="telefono">Telefono</label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
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
          <StandardButton
            rounded="true"
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

      <form v-if="modalType === 'puestos'">
        <section class="header">
          <h2>Añadir nuevos puestos</h2>
        </section>
        <section class="main">
          <section class="fieldset-group">
            <fieldset>
              <label for="anyo">Año {{ newPuesto.anyo }}</label>
              <input
                type="number"
                name="anyo"
                id="anyo"
                required
                min="2010"
                :placeholder="anyoActual"
                v-model="newPuesto.anyo"
              />
            </fieldset>
            <fieldset>
              <label for="vacantes">Vacantes</label>
              <input
                type="number"
                name="vacantes"
                id="vacantes"
                placeholder="15"
                min="0"
                required
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
                placeholder="9:00 - 14:00"
              />
            </fieldset>
            <fieldset>
              <label for="ciclo">Ciclo</label>
              <select name="ciclo" id="ciclo">
                <option value="FPB">FPB</option>
                <option value="SMR">SMR</option>
                <option value="DAM">DAM</option>
                <option value="DAW">DAW</option>
                <option value="ASIR">ASIR</option>
                <option value="IMSA">IMSA</option>
              </select>
            </fieldset>
          </section>
        </section>

        <fieldset>
          <label for="descrip">Descripción</label>
          <textarea name="descrip" id="descrip" cols="30" rows="10"></textarea>
        </fieldset>

        <section class="button-group">
          <StandardButton idleText="añadir" />
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

      <form v-if="modalType === 'anotaciones'">
        <section class="header">
          <h2>Añadir anotación</h2>
        </section>
        <section class="main">
          <section class="fieldset-group">
            <fieldset>
              <label for="anyo">Año {{ newPuesto.anyo }}</label>
              <input
                type="number"
                name="anyo"
                id="anyo"
                required
                min="2010"
                :placeholder="anyoActual"
                v-model="newPuesto.anyo"
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
              <label for="ciclo">Tipo</label>
              <select name="ciclo" id="ciclo">
                <option value="FPB">Telefono</option>
                <option value="SMR">Correo</option>
                <option value="DAM">Persona</option>
              </select>
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
  <section class="loading" v-if="loading">
    Cargando empresa
    <div class="loading"></div>
  </section>
  <section class="main" v-else>
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
          shadow="false"
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
            shadow="false"
            :modal=showModal
            @click="buttonAdd('anotaciones')"
            size="sm"
          />
        </header>
          <section
            v-if="profile.anotaciones"
            class="anotaciones-data"
          ></section>
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
          shadow="false"
          @click="buttonAdd('puestos')"/>
      </header>
      <ul v-if="puestos && puestos.length > 0">
        <li v-for="puesto in puestos" :key="puesto.cod">
          <p>{{ puesto.nombre }}</p>
          <p>{{ puesto.descripcion }}</p>
          <p>{{ puesto.requisitos }}</p>
        </li>
      </ul>
      <section class="noData" v-else>
        <header>
          <p>No hay puestos 😢</p>
        </header>
      </section>
    </section>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import companyStore from '../../store/perfilEmpresa';
import companyProfile from '../../controllers/api/companyProfile';
import StandardButton from '../buttons/standardButton.vue';
import RoundedButton from '../buttons/roundedButton.vue';
import {
  newContact,
  updateContactFromApi,
  deleteContactFromApi,
} from '../../controllers/api/contactats';

const router = useRouter();
const companyStored = companyStore();

const selectedCompany = ref('');
const rawData = ref('');
const profile = ref('');
const contacts = ref('');
const puestos = ref('');

const errorMessages = ref('');

const anyoActual = new Date().getFullYear();
const fechaActual = ref(new Date().toISOString().split('T')[0]);

const showModal = ref(false);
const modalType = ref('');
const loading = ref(false);

const editMode = ref(false);

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

const newPuesto = ref({
  anyo: anyoActual,
  vacantes: '',
  horario: '',
  ciclo: '',
  descripcion: '',
});

const resetFromData = () => {
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
  newPuesto.value = {
    anyo: anyoActual,
    vacantes: '',
    horario: '',
    ciclo: '',
    descripción: '',
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
    resetFromData();
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

  if (editMode.value) {
    newContactData.value.empresa = profile.value.cif;
    response = await updateContactFromApi(newContactData.value);
  } else {
    response = await newContact(newContactData.value);
  }
  if (response) {
    buttonAdd('close');
    loading.value = false;
    resetFromData();
    await getCompanyProfile();

    editMode.value = false;
  } else {
    loading.value = false;
    errorMessages.value = 'Error al añadir el contacto';
  }
};

const editContact = async (contactN) => {
  newContactData.value = {
    ...contacts.value.find((contact) => contact.n === contactN),
  };
  editMode.value = true;
  buttonAdd('contactos');
};
const deleteContact = async (contactN) => {
  const response = await deleteContactFromApi(contactN);
  if (response) {
    await getCompanyProfile();
  } else {
    errorMessages.value = 'Error al eliminar el contacto';
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
  const theme = document.documentElement.getAttribute('data-theme');
  console.log('El tema es', theme);
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  console.log('El tema es', document.documentElement.getAttribute('data-theme'));
});
</script>
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
  transform: translate(239px, -700px);
}
button.add.annotations{
  position: absolute;
  transform: translate(400px, -650px);
}
button.add.position{
  position: absolute;
  transform: translate(240px, -600px);
}
</style>

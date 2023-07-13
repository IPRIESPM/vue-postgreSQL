<template>
  <section class="modal" v-if="showModal" :class="{ 'is-active': showModal }">
    <section class="modal-main">
      <form v-if="modalType === 'contactos'" @submit="onSubmit">
        <section class="header">
          <h2>Añadir contacto</h2>
          <p>Introduce los datos del nuevo contacto</p>
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
                required
                v-model="newContact.dni"
              />
            </fieldset>
            <fieldset>
              <label for="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Silvia Amorós"
                required
                v-model="newContact.nombre"
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
                required
                v-model="newContact.correo"
              />
            </fieldset>

            <fieldset>
              <label for="telefono">Telefono</label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="612345678"
                required
                v-model="newContact.telefono"
              />
            </fieldset>
          </section>
        </section>
        <section class="fieldset-group">
          <fieldset>
            <label for="tipo">Tipo</label>
            <select name="tipo" id="tipo" v-model="newContact.tipo" >
              <option value="Gerente">Gerente</option>
              <option value="Jefe Proyecto">Jefe Proyecto</option>
              <option value="Técnico">Técnico</option>
              <option value="Tutor">Tutor</option>
              <option value="RRHH">RRHH</option>
            </select>
          </fieldset>
          <fieldset class="checkbox">
            <label for="principal" >Principal</label>
            <input type="checkbox" name="principal" id="principal" v-model="newContact.principal" />
          </fieldset>
        </section>

        <fieldset>
          <label for="funciones">Funciones</label>
          <textarea
            name="funciones"
            id="funciones"
            cols="30"
            rows="10"
            v-model="newContact.funciones"
          ></textarea>
        </fieldset>

        <section class="button-group">
          <StandardButton :loading="loading" idleText="añadir" loadingText="Cargando" />
          <button type="button" class="cancel" @click="buttonAdd('close')">
            Cancelar
          </button>
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
                type="date"
                name="anyo"
                id="anyo"
                required
                v-model="newPuesto.anyo"
                @change="extractYear"
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
                required
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
          <textarea
            name="descrip"
            id="descrip"
            cols="30"
            rows="10"
          ></textarea>
        </fieldset>

        <section class="button-group">
          <StandardButton idleText="añadir" />
          <button type="button" class="cancel" @click="buttonAdd('close')">
            Cancelar
          </button>
        </section>
      </form>

    </section>
    <button type="button"
        :class="{ 'puestos': modalType =='puestos' }"
        class="add" @click="buttonAdd('close')">
      <font-awesome-icon v-if="showModal" :icon="['fas', 'minus']" />
      <font-awesome-icon v-else :icon="['fas', 'plus']" />
    </button>
  </section>
  <section class="loading" v-if="loading">
    Cargando empresa
    <div class="loading"></div>
  </section>
  <section class="main" v-else>
    <h1>{{ profile.nombre }}</h1>
    <section class="empresa">
      <p>
        <font-awesome-icon :icon="['fas', 'building']" />
        {{ profile.direccion }} {{ profile.localidad }}, {{ profile.comunidad }}
      </p>

      <p class="encargado">
        <span>
          <font-awesome-icon :icon="['fas', 'mobile']" /> {{ profile.telefono }}
        </span>
        <span>
          <font-awesome-icon :icon="['fas', 'user-graduate']" />
          {{ profile.nombre_profesor }}
        </span>
      </p>
    </section>
    <section class="contacts">
      <h2>Contactos</h2>
      <ul v-if="contacts">
        <li v-for="contact in contacts" :key="contact.n">
          <p>{{ contact.nombre }}</p>
          <p>{{ contact.email }}</p>
          <p>{{ contact.telefono }}</p>
        </li>
      </ul>
      <section class="noData" v-else>
        <p>No hay contactos 😢</p>
        <StandardButton idleText="añadir" @click="buttonAdd('contactos')" />
      </section>
    </section>
    <section class="puestos">
      <h2>Puestos</h2>
      <ul v-if="puestos">
        <li v-for="puesto in puestos" :key="puesto.cod">
          <p>{{ puesto.nombre }}</p>
          <p>{{ puesto.descripcion }}</p>
          <p>{{ puesto.requisitos }}</p>
        </li>
      </ul>
      <section class="noData" v-else>
        <p>No hay puestos 😢</p>
        <StandardButton idleText="añadir" @click="buttonAdd('puestos')" />
      </section>
    </section>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import companyStore from '../../store/perfilEmpresa';
import companyProfile from '../../controllers/api/companyProfile';
import StandardButton from '../standardButton.vue';

const router = useRouter();
const companyStored = companyStore();

const selectedCompany = ref('');
const rawData = ref('');
const profile = ref('');
const contacts = ref('');
const puestos = ref('');

const showModal = ref(false);
const modalType = ref('');
const loading = ref(false);

const newContact = ref({
  dni: '',
  nombre: '',
  correo: '',
  telefono: '',
  tipo: 'RRHH',
  principal: false,
  funciones: '',
});

const newPuesto = ref({
  anyo: '',
  vacantes: '',
  horario: '',
  ciclo: '',
  descripcion: '',
});

const resetFromData = () => {
  newContact.value = {
    dni: '',
    nombre: '',
    correo: '',
    telefono: '',
    tipo: 'RRHH',
    principal: false,
    funciones: '',
  };
  newPuesto.value = {
    anyo: '',
    vacantes: '',
    horario: '',
    ciclo: '',
    descripcion: '',
  };
};
const buttonAdd = (type) => {
  if (type === 'close') {
    showModal.value = false;
    modalType.value = '';
    resetFromData();
    return;
  }
  showModal.value = true;
  modalType.value = type;
};
const extractYear = (event) => {
  const date = new Date(event.target.value);
  newPuesto.value.anyo = date.getFullYear();
};
const getCompanyProfile = async () => {
  const profileApi = await companyProfile(companyStored.getEmpresaSelected);
  rawData.value = profileApi;
  profile.value = profileApi.empresa;
  contacts.value = profileApi.contactos;
  puestos.value = profileApi.puestos;
};
const onSubmit = async (event) => {
  event.preventDefault();
  loading.value = true;

  const response = await companyProfile.addContact(
    companyStored.getEmpresaSelected,
    newContact.value,
  );
  if (response) {
    getCompanyProfile();
    buttonAdd('close');
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

button.add {
    border-radius: 100%;
    position: absolute;
    transform: translateX(480%) translateY(-780%);
}
button.add.puestos {
    transform: translateX(430%) translateY(-640%);
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

</style>

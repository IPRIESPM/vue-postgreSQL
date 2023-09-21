<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import RoundedButton from '../buttons/roundedButton.vue';
import LoadingText from '../loading/loadingText.vue';

import contactStore from '../../store/contact';
import perfilEmpresa from '../../store/perfilEmpresa';
import modalStore from '../../store/modal';

import getContactsById, { deleteContactFromApi } from '../../controllers/api/contacts';
import AnnotationsModule from './AnnotationsModule.vue';

const contactStored = contactStore();
const modalStored = modalStore();
const perfilEmpresaStored = perfilEmpresa();

const loading = ref(false);
const contacts = ref([]);
const principal = ref('');

const selectContact = (id) => {
  contactStored.selectContact(id);
  contactStored.selected = id;
  principal.value = contactStored.contacts.find((contact) => contact.n === id);
};

const newContact = () => {
  modalStored.setEditMode(false);
  modalStored.setShowModal(true);
  modalStored.setModalType('contacts');
  contactStored.$reset();
};

const editContact = (id) => {
  contactStored.selectContact(id);
  modalStored.setEditMode(true);
  modalStored.setShowModal(true);
  modalStored.setModalType('contacts');
};
const deleteContact = async (id) => {
  const response = await deleteContactFromApi(id);
  if (response) {
    contacts.value = contacts.value.filter((cont) => cont.n !== id);
  }
};
onMounted(async () => {
  const { data } = await getContactsById(perfilEmpresaStored.cif);
  await contactStored.setContacts(data);
  contacts.value = contactStored.contacts;
  principal.value = contacts.value.find((contact) => contact.principal === true);
  if (!principal.value) {
    [principal.value] = contacts.value;
  }

  const [selectedContact] = contacts.value.filter((contact) => contact.n === principal.value.n);

  if (principal.value) {
    selectContact(principal.value.n);
    contactStored.loading = false;
  }
});

onBeforeMount(() => {
  contactStored.loading = true;
  loading.value = true;
});

</script>
<template>
  <section class="companyModule">
    <header>
      <h2>Contactos</h2>
      <RoundedButton
        :modal="false"
        @click="newContact()"
        :shadow="false"
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
          <tr
            v-for="contact in contacts"
            :key="contact.n"
            @click="selectContact(contact.n)"
          >
            <td :class="{ principal: contact.n === principal.n }">{{ contact.nombre }}</td>
            <td :class="{ principal: contact.n === principal.n }">{{ contact.telefono }}</td>
            <td :class="{ principal: contact.n === principal.n }">{{ contact.correo }}</td>
            <td :class="{ principal: contact.n === principal.n }" class="icons">
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
      <AnnotationsModule :selected="contactStored.selected"/>
    </section>

    <section class="loading" v-else-if="loading">
      <LoadingText loadingText="Cargando contactos..." />
    </section>
    <section class="noData" v-else>
      <p>No hay contactos 😢</p>
    </section>
  </section>
</template>

<style scoped>
header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

section.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
table {
  width: auto;
  border-collapse: collapse;
}
table thead th,
table tbody td {
  padding: 0 10px;
}
table tbody td {
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.principal {
  background-color: var( --color-background-soft);
  color: var(--color-text-muted);
}
table tbody tr:hover {
  background-color: #f5f5f5;
}

table tbody tr td.icons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

table tbody tr td.icons svg {
  cursor: pointer;
}

</style>

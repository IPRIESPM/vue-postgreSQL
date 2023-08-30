import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('contact', {
  state: () => ({
    loading: ref(false),
    selected: ref(0),
    contacts: ref([]),
    name: ref(''),
    email: ref(''),
    phone: ref(''),
    dni: ref(''),
    type: ref(''),
    principal: ref(false),
    functions: ref(''),
    n: ref(''),
  }),
  getters: {
    getContacts: (state) => state.contacts,
    getContact: (state) => ({
      name: state.name,
      email: state.email,
      phone: state.phone,
      dni: state.dni,
      type: state.type,
      principal: state.principal,
      functions: state.functions,
      n: state.n,
    }),

  },
  actions: {
    selectContact(n) {
      const index = this.contacts.findIndex((cont) => cont.n === n);
      this.setContact(this.contacts[index]);
    },
    setContacts(contacts) {
      this.contacts = contacts;
    },
    setContact(contact) {
      console.log('Contact', contact);
      this.name = contact.nombre;
      this.email = contact.correo;
      this.phone = contact.telefono;
      this.dni = contact.dni;
      this.type = contact.tipo;
      this.principal = contact.principal;
      this.functions = contact.funciones;
      this.n = contact.n;
    },
    addContact(contact) {
      this.contacts.push(contact);
    },
    updateContact(contact) {
      const index = this.contacts.findIndex((cont) => cont.dni === contact.dni);
      this.contacts[index] = contact;
    },
    deleteContact(dni) {
      const index = this.contacts.findIndex((cont) => cont.dni === dni);
      this.contacts.splice(index, 1);
    },
    reset() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.dni = '';
      this.type = '';
      this.principal = false;
      this.functions = '';
      this.contacts = [];
    },
  },
  persist: {
    enabled: false,
  },

});

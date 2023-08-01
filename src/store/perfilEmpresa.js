import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('empresa', {
  state: () => ({
    cif: ref(''),
    nombre: ref(''),
    direccion: ref(''),
    localidad: ref(''),
    comunidad: ref(''),
    telefono: ref(''),
    profesor: ref(''),
    contactos: ref([]),
    puestos: ref([]),
    anotaciones: ref([]),
    empresaSeleccionada: ref({}),
    selectedContact: ref({}),
  }),
  getters: {
    getEmpresa: (state) => state,
    getEmpresaSelected: (state) => state.cif,
    getPrincipalContact: (state) => state.contactos.find((contacto) => contacto.principal === true),

  },
  actions: {
    setAnnotations(annotations) {
      console.log(annotations);
      this.anotaciones = annotations;
    },
    updateEmpresa(objeto) {
      console.log(objeto);
      const {
        empresa, contactos, puestos,
      } = objeto;
      this.cif = empresa.cif;
      this.nombre = empresa.nombre;
      this.direccion = empresa.direccion;
      this.localidad = empresa.localidad;
      this.comunidad = empresa.comunidad;
      this.telefono = empresa.telefono;
      this.profesor = empresa.profesor;
      this.contactos = contactos;
      this.puestos = puestos;
    },
    deleteEmpresa() {
      this.cif = '';
      this.nombre = '';
      this.direccion = '';
      this.localidad = '';
      this.comunidad = '';
      this.telefono = '';
      this.profesor = '';
      this.contactos = [];
      this.puestos = [];
      this.anotaciones = [];
    },
    selectEmpresa(cif) {
      this.cif = cif;
    },
    setSelectedContact(n) {
      this.selectedContact = this.contactos.find((contacto) => contacto.n === n);
    },
  },
  persist: {
    enabled: true,
  },

});

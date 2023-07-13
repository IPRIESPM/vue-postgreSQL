import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('empresa', {
  state: () => ({
    selected: ref(''),
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
  }),
  getters: {
    getEmpresa: (state) => state,
    getEmpresaSelected: (state) => state.selected,
  },
  actions: {
    selectEmpresa(cif) {
      this.selected = cif;
    },
    setEmpresa(data) {
      this.listado = data.data;
      this.version = data.version;
      this.date = new Date();
    },
    addEmpresa(empresa) {
      this.listado.push(empresa);
    },
    updateEmpresa(empresa) {
      this.cif = empresa.cif;
      this.nombre = empresa.nombre;
      this.direccion = empresa.direccion;
      this.localidad = empresa.localidad;
      this.comunidad = empresa.comunidad;
      this.telefono = empresa.telefono;
      this.profesor = empresa.profesor;
      this.contactos = empresa.contactos;
      this.puestos = empresa.puestos;
      this.anotaciones = empresa.anotaciones;
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
  },
  persist: {
    enabled: false,
  },

});

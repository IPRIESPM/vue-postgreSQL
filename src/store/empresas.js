import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('empresas', {
  state: () => ({
    listado: ref([]),
    version: ref(0),
    date: ref(new Date()),
  }),
  getters: {
    getEmpresas: (state) => state,
    getEmpresasOrdered: () => this.listado.sort(
      (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion),
    ),
    getEmpresasOrderedByName: () => this.listado.sort(
      (a, b) => a.nombre.localeCompare(b.nombre),
    ),
  },
  actions: {
    setEmpresas(data) {
      this.listado = data.data;
      this.version = data.version;
      this.date = new Date();
    },
    addEmpresa(empresa) {
      this.listado.push(empresa);
    },
    updateEmpresa(empresa) {
      const index = this.listado.findIndex((e) => e.cif === empresa.cif);
      this.listado[index] = empresa;
    },
    deleteEmpresa(empresa) {
      const index = this.listado.findIndex((e) => e.cif === empresa.cif);
      this.listado.splice(index, 1);
    },
  },
  persist: {
    enabled: true,
  },

});

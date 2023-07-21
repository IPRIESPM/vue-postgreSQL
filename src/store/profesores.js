import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('profesores', {
  state: () => ({
    listado: ref([]),
    version: ref(0),
    date: ref(new Date()),
  }),
  getters: {
    getProfesores: (state) => state,
    getProfesoresOrdered: () => this.listado.sort(
      (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion),
    ),
    getProfesoresOrderedByName: () => this.listado.sort(
      (a, b) => a.nombre.localeCompare(b.nombre),
    ),
  },
  actions: {
    setProfesores(data) {
      this.listado = data.data;
      this.version = data.version;
      this.date = new Date();
    },
    addProfesor(profesor) {
      this.listado.push(profesor);
    },
    updateProfesor(profesor) {
      const index = this.listado.findIndex((p) => p.dni === profesor.dni);
      this.listado[index] = profesor;
    },
    deleteProfesor(dni) {
      const index = this.listado.findIndex((p) => p.dni === dni);
      console.log('Profesor', dni);
      console.log('index', index);
      console.log('listado', this.listado);
      this.listado.splice(index, 1);
    },
  },
  persist: {
    enabled: true,
  },

});

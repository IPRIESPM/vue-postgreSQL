import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('user', {
  state: () => ({
    dni: ref(''),
    nombre: ref(''),
    telefono: ref(''),
    correo: ref(''),
    tipo: ref(''),
  }),
  getters: {
    getUser: (state) => state,
  },
  actions: {
    setUser(user) {
      this.dni = user.dni;
      this.nombre = user.nombre;
      this.telefono = user.telefono;
      this.correo = user.correo;
      this.tipo = user.admin || 'user';
    },
  },
  persist: {
    enabled: true,
  },
});

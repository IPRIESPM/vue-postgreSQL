import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('annotations', {
  state: () => ({
    annotations: ref([]),
    cod: ref(''),
    contact_n: ref(''),
    professor_dni: ref(''),
    date: ref(''),
    year: ref(''),
    type: ref(''),
    confirmed: ref(false),
    annotation: ref(''),
  }),
  getters: {
    getAnnotations: (state) => state.annotations,
    getAnnotation: (state) => ({
      cod: state.cod,
      contact_n: state.contact_n,
      professor_dni: state.professor_dni,
      date: state.date,
      year: state.year,
      type: state.type,
      confirmed: state.confirmed,
      annotation: state.annotation,
    }),

  },
  actions: {
    selectAnnotation(cod) {
      const index = this.annotations.findIndex((cont) => cont.codigo === cod);
      this.setAnnotation(this.annotations[index]);
    },
    setAnnotations(annotations) {
      this.annotations = annotations;
    },
    setAnnotation(annotation) {
      this.cod = annotation.codigo;
      this.contact_n = annotation.contacto_n;
      this.professor_dni = annotation.profesor_dni;
      this.date = annotation.fecha;
      this.year = annotation.anyo;
      this.type = annotation.tipo;
      this.confirmed = annotation.confirmado;
      this.annotation = annotation.anotacion;
    },
    addAnnotation(annotation) {
      this.annotations.push(annotation);
    },
    updateAnnotation(annotation) {
      const index = this.annotations.findIndex((cont) => cont.cod === annotation.cod);
      this.annotations[index] = annotation;
    },
    deleteAnnotation(cod) {
      const index = this.annotations.findIndex((cont) => cont.cod === cod);
      this.annotations.splice(index, 1);
    },
    reset() {
      this.cod = '';
      this.contact_n = '';
      this.professor_dni = '';
      this.date = '';
      this.year = '';
      this.type = '';
      this.confirmed = false;
      this.annotation = '';
    },
  },
  persist: {
    enabled: false,
  },

});

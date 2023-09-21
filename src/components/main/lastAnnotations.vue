<script setup>
import { onMounted, ref } from 'vue';
import { getLastAnnotationFromApi } from '../../controllers/api/annotations';
import LoadingText from '../loading/loadingText.vue';

const loading = ref(false);
const lastAnnotation = ref(null);

const modal = ref(false);

const annotationSelected = ref(null);

const showAnnotation = (id) => {
  lastAnnotation.value.forEach((annotation) => {
    if (annotation.codigo === id) {
      annotationSelected.value = annotation;
      modal.value = true;
    }
  });
};
const closeAnnotation = () => {
  modal.value = false;
};
onMounted(async () => {
  loading.value = true;
  lastAnnotation.value = await getLastAnnotationFromApi();
  loading.value = false;
});
</script>
<template>
  <LoadingText v-if="loading" />

  <section class="main tableData" v-else>
    <section class="modal"
      :class="{ 'is-active': modal }"
      v-if="modal">

      <section class="modal-main">
        <button @click="closeAnnotation">Salir</button>
        <h2>Anotación de {{ annotationSelected.nombre_contacto }}</h2>
        <p>
          <fieldset>
            <span>Fecha:</span>
            {{ new Date(annotationSelected.fecha).toLocaleDateString() }}
          </fieldset>
          <fieldset>
            <span>Confirmado:</span>
            {{ annotationSelected.verificado ? "Confirmado" : "No confirmado" }}
          </fieldset>
          <fieldset>
            <span>Responsable:</span>
            {{ annotationSelected.nombre_profesor }}
          </fieldset>

          <fieldset>
            <span>Empresa:</span>
            {{ annotationSelected.nombre_empresa }}
          </fieldset>
        </p>
        <p>
          <fieldset>
            <span>Comentario:</span>

            {{ annotationSelected.comentario ? annotationSelected.comentario : "Sin comentario" }}
          </fieldset>
        </p>
      </section>
    </section>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>
            <font-awesome-icon :icon="['fas', 'user-graduate']" /> Profesor
          </th>
          <th><font-awesome-icon :icon="['fas', 'building']" /> Empresa</th>
          <th>
            <font-awesome-icon :icon="['fas', 'address-card']" /> Contacto
          </th>
          <th>Verificado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="annotation in lastAnnotation" :key="annotation.codigo">
          <td>
            {{ new Date(annotation.fecha).toLocaleDateString() }}
          </td>
          <td>
            {{ annotation.nombre_profesor }}
          </td>
          <td>
            {{ annotation.nombre_empresa }}
          </td>
          <td>
            {{ annotation.nombre_contacto }}
          </td>
          <td>
            {{ annotation.verificado ? "Confirmado" : "No confirmado" }}
          </td>
          <td class="icons" @click="showAnnotation(annotation.codigo)">
            <a class="icon">
              <font-awesome-icon :icon="['fas', 'eye']" />
              Ver comentario
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<style scoped>
section.tableData {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section.tableData table thead {
  color: var(--color-text-muted);
  text-align: left;
  margin-bottom: 0.5rem;
  /* Add margin-bottom to create space */
}

table thead th {
  font-weight: inherit;
  border-bottom: 1px solid var(--color-text-muted);
  text-align: left;
}

section.tableData table tbody td {
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-text-muted);
}

button.add {
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  width: 50px;
  height: 52px;

  border-radius: 100%;
  outline: none;
  border: none;

  background-color: var(--color-background-soft);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

button.add.variant {
  position: relative;
  top: -259px;
  border-radius: 100%;
  outline: none;
  border: none;

  background-color: var(--color-background);
}

header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

button.update {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
}
section.modal {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

section.modal.is-active {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  width: max-content;
  padding: 15px;
  background: var(--color-background-soft);

  border: 1px solid black;
  border-radius: 5px;
}

section.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section.personal,
section.contact {
  display: flex;
  flex-direction: row;
}

section.contrasena {
  display: flex;
  flex-direction: column;
  align-items: center;
}

section.personal fieldset,
section.contact fieldset,
section.contrasena fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

section.buttons {
  display: flex;
  justify-content: space-between;
  align-self: center;
}

section.buttons input[type="button"] {
  background-color: aliceblue;
}

section.loading,
section.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

section.noData {
  height: 100%;
}

td {
  height: 30px;
}

td.icons {
  display: flex;
  align-items: center;
}

td.empty,
th.empty {
  color: var(--color-text-muted);
  text-align: center;
}

td span {
  width: 100%;
}

td input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  font-size: inherit;
  color: inherit;
  border-bottom: 1px solid var(--color-text-muted);
}

section.editZone {
  display: flex;
  gap: 1rem;
}

.bounce {
  animation: bounce 0.5s 1 linear forwards;
}
a.icon {
  cursor: pointer;
}
section.modal{
  section.modal-main{
    width: 50%;
    padding: 2rem;
    background: var(--color-background);

    border-radius: 8px;

    p{
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
  }

}

</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import RoundedButton from '../buttons/roundedButton.vue';
import LoadingText from '../loading/loadingText.vue';

import modalStore from '../../store/modal';
import annotationsStore from '../../store/annotations';
import { getContactAnnotationFromApi } from '../../controllers/api/annotations';

const modalStored = modalStore();
const annotationsStored = annotationsStore();

const annotations = ref([]);
const loading = ref(false);

const getAnnotations = async (value) => {
  loading.value = true;
  const response = await getContactAnnotationFromApi(value);
  annotations.value = response;
  annotationsStored.setAnnotations(response);
  loading.value = false;
};

const addAnnotation = () => {
  modalStored.setEditMode(false);
  modalStored.setShowModal(true);
  modalStored.setModalType('annotations');
};

const editAnnotation = (id) => {
  console.log('id: ', id);
  modalStored.setEditMode(true);
  modalStored.setShowModal(true);
  modalStored.setModalType('annotations');
  console.log('annotationsStored', id);
  annotationsStored.selectAnnotation(id);
};

const props = defineProps({
  selected: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await getAnnotations(props.selected);
});

watch(
  () => props.selected,
  async (value) => {
    console.log('[watch] Annotations selected', value);
    await getAnnotations(value);
  },
);
</script>

<template>
  <section class="anotaciones">
    <header>
      <h2>Anotaciones</h2>
      <RoundedButton
        :shadow="false"
        :modal="false"
        @click="addAnnotation"
        size="sm"
      />
    </header>
    <section v-if="loading">
      <LoadingText :loading-text="'Cargando anotaciones'" />
    </section>
    <section
      v-if="annotations && annotations.length > 0 && !loading"
      class="anotaciones-data"
    >
      <table>
        <thead>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Confirmado</th>
          <th>Opciones</th>
        </thead>
        <tbody>
          <tr v-for="annotation in annotations" :key="annotation.codigo">
            <td>{{ new Date(annotation.fecha).toLocaleDateString() }}</td>
            <td>{{ annotation.tipo }}</td>
            <td>
              {{ annotation.confirmado ? "Confirmado" : "Sin confirmar" }}
            </td>
            <td class="icons">
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                @click="editAnnotation(annotation.codigo)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="deleteAnnotation(annotation.codigo)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-else class="noData">No hay anotaciones 😢</section>
  </section>
</template>
<style scoped>
header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
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
  background-color: var(--color-background-soft);
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

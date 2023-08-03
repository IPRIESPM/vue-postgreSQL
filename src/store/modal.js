import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('modal', {
  state: () => ({
    loading: ref(false),
    showModal: ref(false),
    editMode: ref(false),
  }),
  getters: {
    getLoading: (state) => state.loading,
    getEditMode: (state) => state.editMode,
    getShowModal: (state) => state.showModal,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setShowModal(showModal) {
      this.showModal = showModal;
    },
    setEditMode(editMode) {
      this.editMode = editMode;
    },
  },
  persist: {
    enabled: false,
  },

});

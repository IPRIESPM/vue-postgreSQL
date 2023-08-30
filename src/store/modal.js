import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('modal', {
  state: () => ({
    loading: ref(false),
    showModal: ref(false),
    editMode: ref(false),
    editValue: ref(null),
    type: ref(null),
  }),
  getters: {
    getLoading: (state) => state.loading,
    getEditMode: (state) => state.editMode,
    getShowModal: (state) => state.showModal,
    getModalType: (state) => state.type,
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
    setModalType(type) {
      this.type = type;
    },
  },
  persist: {
    enabled: false,
  },

});

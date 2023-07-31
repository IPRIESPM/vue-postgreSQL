import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('modal', {
  state: () => ({
    loading: ref(false),
    showModal: ref(false),
  }),
  getters: {
    getLoading: (state) => state.loading,
    getShowModal: (state) => state.showModal,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setShowModal(showModal) {
      this.showModal = showModal;
    },
  },
  persist: {
    enabled: false,
  },

});

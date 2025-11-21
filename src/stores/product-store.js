import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    selectedCategoryId: null,
  }),

  getters: {
    getSelectedCategoryId: (state) => state.selectedCategoryId,
  },

  actions: {
    setSelectedCategoryId(categoryId) {
      this.selectedCategoryId = categoryId
    },
    clearSelectedCategoryId() {
      this.selectedCategoryId = null
    },
  },
})

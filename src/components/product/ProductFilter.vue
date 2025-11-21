<template>
  <h6>Filtros</h6>
  <div class="category-filter">
    <q-select v-model="selectedCategory" :options="categories" option-value="id" option-label="description"
      label="Categoría" dense outlined>
    </q-select>
  </div>

  <div class="price-filter">

  </div>
</template>

<style></style>
<script>
import { useProductStore } from "src/stores/product-store";

export default {
  name: "ProductFilter",
  data() {
    return {
      categories: [],
      selectedCategory: null,
      priceRange: [0, 1000],
      productStore: useProductStore(),
    };
  },
  watch: {
    selectedCategory(newValue) {
      // Actualizar la store cuando cambia la categoría seleccionada
      if (newValue !== null && newValue !== undefined) {
        this.productStore.setSelectedCategoryId(newValue.id);
      } else {
        this.productStore.clearSelectedCategoryId();
      }
    },
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      // Lógica para obtener categorías desde una API o fuente de datos
      let endpointURL = "/api/category";
      // Obtener token
      let token = JSON.parse(localStorage.getItem("token"));

      this.$api.get(endpointURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
  },
};
</script>

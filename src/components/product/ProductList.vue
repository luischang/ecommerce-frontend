<template>
  <h6>Listado de Productos</h6>
  <div class="product-list">
    <div class = "product-grid">
      <div class="product-item" v-for="item in products" :key="item.id">
        <ProductItem :product="item"  />
      </div>
    </div>
  </div>
</template>
<style>
.product-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
</style>
<script>
import ProductItem from "src/components/product/ProductItem.vue";
import { useProductStore } from "src/stores/product-store";

export default {
  name: "ProductList",
  components: {
    ProductItem,    
  },
  data() {
    return {
      products: [],
      allProducts: [],
      productStore: useProductStore(),
    };
  },
  watch: {
    'productStore.selectedCategoryId'(newValue) {
      // Filtrar productos cuando cambia la categoría seleccionada
      this.filterProducts(newValue);
    },
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      // Lógica para cargar productos desde una API o fuente de datos
      let endpoint = "/api/product";
      let token = JSON.parse(localStorage.getItem("token"));
      this.$api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        //console.log(response.data);
        this.allProducts = response.data;
        this.products = response.data;
      });
    },
    filterProducts(categoryId) {
      if (categoryId === null || categoryId === undefined) {
        // Mostrar todos los productos si no hay categoría seleccionada
        this.products = this.allProducts;
      } else {
        // Filtrar productos por categoría
        this.products = this.allProducts.filter(
          (product) => product.categoryId === categoryId
        );
      }
    },
  },
};
</script>

<template>
    <q-card class ="product-card">
        <q-card-section>
            <q-img :src="product.imageUrl" :alt="product.name" />            
        </q-card-section>
        <q-card-section>            
            <div class="text-subtitle2 text-grey">{{ product.description }}</div>
            <div class="text-h6 text-primary q-mt-sm">Precio: {{ product.price }}</div>
            <q-btn label="Add to Cart" color="primary" class="full-width q-mt-md" />
        </q-card-section>
    </q-card>

</template>

<style>
    .product-card {
        max-width: 300px;
        margin: auto;
    }
    .product-card q-card-section {
        height: 100px;
        overflow: hidden;
    }
</style>

<script>
export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};

</script>
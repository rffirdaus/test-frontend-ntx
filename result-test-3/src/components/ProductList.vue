<template>
  <div class="p-8">
    <h2 class="mb-8 text-3xl font-bold">List Product</h2>
    <div class="flex justify-end">
      <button
        @click="navigateToAddProduct"
        class="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ product.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editProduct(product)" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button @click="deleteProduct(product.id)" class="ml-4 bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ModalSuccess
      :isVisible="isModalVisibleSuccess"
      type="Deleted"
      @close="isModalVisibleSuccess = false" 
    />

    <ModalEditProduct
      :isVisible="isModalVisible"
      :product="selectedProduct"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script>
import ModalEditProduct from './ModalEdit.vue';
import ModalSuccess from './ModalSuccess.vue';

export default {
  components: {
    ModalEditProduct,
    ModalSuccess
  },
  data() {
    return {
      isModalVisible: false,
      isModalVisibleSuccess: false,
      selectedProduct: '',
      products: []
    };
  },
  methods: {
    async editProduct(product) {
      this.selectedProduct = product;
      this.isModalVisible = true;
    },
    async deleteProduct(productId) {
      try {
        await this.$store.dispatch('deleteProduct', productId);
        this.isModalVisibleSuccess = true;
        console.log('Product deleted successfully');
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProduct' }).then(() => {})
    },
  },
  async created() {
    await this.$store.dispatch('fetchProducts');
    this.products = this.$store.state.products;
  }
}
</script>
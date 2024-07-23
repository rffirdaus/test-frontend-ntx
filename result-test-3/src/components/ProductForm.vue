<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-[500px]">
      <h1 class="text-2xl font-bold mb-4">Add New Product</h1>
      <form @submit.prevent="submitForm" class="card">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Product Name</label>
          <input
            id="name"
            v-model="product.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-gray-700">Price</label>
          <input
            id="price"
            v-model="product.price"
            type="number"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <router-link to="/" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Cancel
          </router-link>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
      <ModalSuccess
        :isVisible="isModalVisibleSuccess"
        type="Created data"
        @close="closeModal" 
      />
    </div>
  </div>
</template>

<script>
import ModalSuccess from './ModalSuccess.vue';
export default {
  components: {
    ModalSuccess
  },
  data() {
    return {
      product: {
        name: '',
        price: 0,
        quantity: 0
      },
      isModalVisibleSuccess: false,
    };
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch('addProduct', this.product)
      this.isModalVisibleSuccess = true
      setInterval(() => {
        if (this.$route.path !== '/') {
          this.$router.push('/').catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              console.error('Navigation error:', err);
            }
          });
        }
      }, 3000);
    },
    closeModal() {
      this.isModalVisibleSuccess = false
    },
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
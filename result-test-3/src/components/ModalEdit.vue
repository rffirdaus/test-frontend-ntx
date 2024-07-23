<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Edit Product</h2>
      <form @submit.prevent="updateProduct">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Product Name</label>
          <input
            id="name"
            v-model="editedProduct.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-gray-700">Price</label>
          <input
            id="price"
            v-model="editedProduct.price"
            type="number"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <ModalSuccess
      :isVisible="isModalVisibleSuccess"
      type="Updated"
      @close="closeModal" 
    />
  </div>
</template>

<script>
import ModalSuccess from './ModalSuccess.vue';
export default {
  components: {
    ModalSuccess
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    product: {
      type: [ Object, String ],
      required: true
    }
  },
  data() {
    return {
      editedProduct: {
        name: '',
        price: '',
        id: ''
      },
      isModalVisibleSuccess: false,
    };
  },
  watch: {
    product (data) {
      this.editedProduct = {
        name: data.name,
        price: data.price,
        id: data.id
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.isModalVisibleSuccess = false
    },
    async updateProduct() {
      try {
        await this.$store.dispatch('updateProduct', this.editedProduct)
        this.isModalVisibleSuccess = true;
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
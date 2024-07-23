<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-xl font-semibold mb-4">Success</h2>
      <p class="mb-4">The product has been successfully {{ type }}.</p>
      <button @click="close" class="bg-blue-500 text-white px-4 py-2 rounded">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    type: {
      type: [ Object, String ],
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>

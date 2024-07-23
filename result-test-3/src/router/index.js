import Vue from 'vue';
import Router from 'vue-router';
import ProductList from '../views';
import ProductForm from '../components/ProductForm.vue';

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'ListProduct',
    component: ProductList,
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: ProductForm,
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
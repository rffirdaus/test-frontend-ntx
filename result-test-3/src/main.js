import Vue from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import store from './store';
import router from './router';
import './assets/main.css'

Vue.config.productionTip = false;

// Setup Apollo Client
const httpLink = new HttpLink({
  uri: 'https://sirefcode.hasura.app/v1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'jw8y3lwW7Vk4HKuROjlbs3flnrYaDsE1vkqNqhtTgv3rIo8bC655Fx6WmSZk4KvO',
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

new Vue({
  store,
  router,
  provide: {
    apolloClient,
  },
  render: h => h(App),
}).$mount('#app');
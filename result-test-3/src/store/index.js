import Vue from "vue";
import Vuex from "vuex";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client/core";

Vue.use(Vuex);

const httpLink = new HttpLink({
  uri: "https://sirefcode.hasura.app/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "jw8y3lwW7Vk4HKuROjlbs3flnrYaDsE1vkqNqhtTgv3rIo8bC655Fx6WmSZk4KvO",
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default new Vuex.Store({
  state: {
    products: [],
    loading: false,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await apolloClient.query({
          query: gql`
            query {
              products {
                id
                name
                price
              }
            }
          `,
        });
        commit("SET_PRODUCTS", data.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addProduct({ commit, dispatch }, product) {
      commit("SET_LOADING", true);
      try {
        const response = await apolloClient.mutate({
          mutation: gql`
            mutation ($name: String!, $price: numeric!, $quantity: Int!) {
              insert_products_one(
                object: { name: $name, price: $price, quantity: $quantity }
              ) {
                id
                name
                price
                quantity
              }
            }
          `,
          variables: {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          },
        });
        await dispatch("fetchProducts"); // Optionally refetch products if needed
      } catch (error) {
        console.error("Failed to add product:", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async updateProduct({ commit, dispatch }, product) {
      commit("SET_LOADING", true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation ($id: ID!, $name: String!, $price: numeric!) {
              update_product(
                where: { id: { _eq: $id } }
                _set: { name: $name, price: $price }
              ) {
                returning {
                  id
                  name
                  price
                }
              }
            }
          `,
          variables: {
            id: product.id,
            name: product.name,
            price: product.price,
          },
        });
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Failed to update product:", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async deleteProduct({ commit, dispatch }, productId) {
      commit("SET_LOADING", true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation ($id: ID!) {
              delete_product(where: { id: { _eq: $id } }) {
                returning {
                  id
                }
              }
            }
          `,
          variables: { id: productId },
        });
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Failed to delete product:", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
});

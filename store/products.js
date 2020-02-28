import axios from 'axios'

const apiURL = 'http://localhost:3001'

const state = () => ({
    products: []
})

let count = 0

const mutations = {
    'FETCH_PRODUCTS' (state, payload) {
        state.products = [...state.products, ...payload]
        count += 10
    },
    'FETCH_FAVORITE_PRODUCTS' (state, payload) {
        state.products = payload
        count = 0
    },
    'UPDATE_FAVORITE_PRODUCT' (state, payload) {
        const newFavorite = (payload.favorite == 0) ? "1" : 0
        axios.patch(apiURL + `/grocery/${payload.id}`, { favorite: newFavorite }).catch(err => console.log(err))
        state.products.map(product => {
            if (product.id == payload.id) {
                product.favorite = newFavorite
            }
        })
    },
    'TAKE_FROM_STOCK' (state, payload) {
        state.products.map(product => {
            if (product.id == payload.id) {
                product.stock--
            }
        })
        axios.patch(apiURL + `/grocery/${payload.id}`, { stock: payload.stock - 1 }).catch(err => console.log(err))
    },
    'ADD_TO_STOCK' (state, payload) {
        state.products.map(product => {
            if (product.id == payload.id) {
                product.stock++
            }
        })
        axios.patch(apiURL + `/grocery/${payload.id}`, { stock: payload.stock + 1 }).catch(err => console.log(err))
    }
}

const actions = {
    fetchProducts({ commit }) {
        axios.get(apiURL + '/grocery').then(res => {
            commit('FETCH_PRODUCTS', res.data.slice(count, count + 10))
        })
    },
    updateFavoriteProduct({ commit }, product) {
        axios.get(apiURL + `/grocery/${product.id}`).then(res => {
            commit('UPDATE_FAVORITE_PRODUCT', res.data)
        })
        .catch(err => console.log(err))
    },
    takeFromStock({ commit }, product) {
        commit('TAKE_FROM_STOCK', product)
    },
    addToStock({ commit }, product) {
        commit('ADD_TO_STOCK', product)
    },
    fetchFavoriteProducts({ commit }) {
        axios.get(apiURL + '/grocery?favorite=1').then(res => {
            commit('FETCH_FAVORITE_PRODUCTS', res.data)
        })
    }
}

const getters = {
    products: (state) => state.products
}

export default { state, mutations, actions, getters }
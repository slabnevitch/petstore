import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		products: [],
		cart:  [],
		isSession: false,
		searchValue: ''
	},
	mutations: {
		setProducts(state, payload){
			state.products = payload
		},
		addToCart(state, payload){
			let isContains = state.cart.find(product => product.id === payload.id);
			if(isContains){
				console.log(typeof isContains.inCart)
				let currentCount = isContains.inCart
				Vue.set(isContains, 'inCart', +isContains.inCart + 1)
				// isContains.inCart += 1
			}else{
				Vue.set(payload, 'inCart', 1)
				// payload.inCart = 1
				state.cart.push(payload);
			}
		},
		removeFromCart(state, payload){
			state.cart.splice(state.cart.indexOf(payload), 1)
		},
		setSession(state, user){
			state.isSession = user
		},
		setSearchValue(state, value){
			state.searchValue = value
		}
	},
	actions: {
		fetchProducts(ctx){
			axios.get('./assets/products.json')
			.then((response) => {
				ctx.commit('setProducts', response.data.products)
			    // console.log(this.products);
			})
			.catch((error) => {
			    // handle error
			    console.log(error);
			})
		},
		addProduct(ctx, payload){
			ctx.commit('addToCart', payload)
		}
	},
	getters: {
		getProducts: state => state.products,
		getCart: state => state.cart,
		getSession: state => state.isSession,
		getSearchValue: state => state.searchValue
	}
})
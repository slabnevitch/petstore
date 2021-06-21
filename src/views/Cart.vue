<template>
	<div>
		<Header :cartValue="getCart.length"/>
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="text-center">Cart Page</h1>
					<!-- <p>{{getCart}}</p> -->
					<!-- <p>{{getProducts}}</p> -->
					<!-- <p>{{cartItems}}</p> -->
				</div>
			</div>
			<hr>
			<CartItem v-for="item in getCart" :product="item" :key="item.id" />
		</div>
		
	</div>
</template>

<script>
	import CartItem from '@/components/CartItem'
	import Header from '@/components/Header'
	import {mapGetters} from 'vuex'

	export default {
		name: 'Cart',
		data() {
			return {
				cartItems: [],
				staticCart: [
				{
					name: 'Item-1',
					inCart: 4,
					price: 10
				},
				{
					name: 'Item-2',
					inCart: 3,
					price: 20
				},
				{
					name: 'Item-3',
					inCart: 2,
					price: 15
				},
				{
					name: 'Item-4',
					inCart: 1,
					price: 5
				}

				]
			}
		},
		components: {
			CartItem,
			Header
		},
		computed: {
			...mapGetters(['getProducts', 'getCart'])
			// cartItems(){
			// 	return this.getProducts.map(product => {
			// 		return {
			// 			...product,
			// 			inCart: this.getCart.filter(item => item === product.id).length
			// 		}
					
			// 	}).filter(key => key.inCart > 0)
			// }
			
		},
		created(){

			this.$store.dispatch('fetchProducts')
			// this.cartItems = this.getProducts.map(product => {
			// 		// console.log(typeof product.id)
			// 		return {
			// 			...product,
			// 			inCart: this.getCart.filter(item => item === product.id).length
			// 		}
					
			// 	}).filter(key => key.inCart > 0)

		} 
	}
</script>
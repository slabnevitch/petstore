<template>
	<div class="row product mb-4">
		<div class="col-md-4">
			<img class="img-fluid" :src="product.image" alt="">
			
		</div>
		<div class="col-md-7 offset-md-1">
			<router-link tag="h2" :to="{name: 'Product', params: {id: product.id, headerText: message, cartValue: cartValue}}">{{product.title}}</router-link>
			<p v-html="product.description"></p>
			<div class="rating">
				<i class="fa-star" v-for="n in 5" 
				:key="`skontik${n}`"
				:class="{fas: product.rating - n > -1, far: product.rating - n < 0}">
					</i>
			</div>
			<div>{{product.price | currencyFilter}}</div>
			<button type="button" class="btn btn-primary mt-2 mb-2"
				@click="addToCart(product)"
				:disabled="!availableLimit(product)">Add to cart</button>
				
				<div class="alert alert-success d-inline-block ml-2" role="alert"
					v-if="product.availableInventory - cardIdLength(product) > 4">
					Buy now!
				</div>
				
				<div class="alert alert-warning d-inline-block ml-2" role="alert"
					v-else-if="product.availableInventory - cardIdLength(product) <= 4 && product.availableInventory - cardIdLength(product) > 0">
					Only {{product.availableInventory - cardIdLength(product)}} items left!
				</div>
				
				<div class="alert alert-danger d-inline-block ml-2" role="alert"
					v-else="product.availableInventory - cardIdLength(product) === 0">
					All out!
				</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'iMain',
		props: ['product', 'cartValue', 'cart'],
		data() {
			return{
				message: 'Vue.js pet depot',
				products: [],
			}
		},
		methods: {
			addToCart(product){
				// console.log(product)
				this.$store.commit('addToCart', product)
				// localStorage.setItem('cart', this.$store.getters.getCart.toString())
				// console.log(this.$store.getters.getCart)
			},
			availableLimit(product){
				return product.availableInventory - this.cardIdLength(product) > 0
			},
			cardIdLength(product){
				let x = this.cart.find((item) => {
					return item.id === product.id
				})
				// console.log(x)
				if(x){
					// console.log(x.inCart)
					return x.inCart
				}else{
					return 0
				}
			}
		}
	}
</script>
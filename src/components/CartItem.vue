<template>
	<div class="row product mb-4">
		<div class="col-md-4">
			<img class="img-fluid" :src="product.image" alt="">
		</div>
		<div class="col-md-7 offset-md-1">
			<h2>{{product.title}}</h2>
			<div class="rating">
				<i class="fa-star" v-for="n in 5" 
				:key="`skontik${n}`"
				:class="{fas: product.rating - n > -1, far: product.rating - n < 0}">
					</i>
			</div>
			<!-- <div>{{product.inCart}}</div> -->
			<div>Price per item: {{product.price | currencyFilter}}</div>
			<div>Total price: {{product.price * product.inCart | currencyFilter}}</div>
			<form>
				<div class="form-group">
					<input type="number" class="form-control" v-model="product.inCart" min="0" step="1" @input="countInput(product, $event)">
				</div>
				<button type="submit" class="btn btn-danger" @click="removeItem(product)">Delete from cart</button>
			</form>
			</div>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'CartItem',
		props: ['product'],
		methods: {
			removeItem(product){
				this.$store.commit('removeFromCart', product)
			},
			countInput(product, event){
				if(event.target.value == 0) this.removeItem(product)
				console.log(event.target.value)
			}
		}
	}
</script>
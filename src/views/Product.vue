<template>
	<div>
		<Header></Header>
		<div class="container">
					<div class="row product mb-4">
						<div class="col-md-4">
							<img class="img-fluid" :src="product.image" alt="">
						</div>
						<div class="col-md-7 offset-md-1">
							<h2>Product {{$route.params.id}}</h2>
							<router-link tag="h2" to="">{{product.title}}</router-link>
							<p v-html="product.description"></p>
							<div class="rating">
								<i class="fa-star" v-for="n in 5" 
								:key="`skontik${n}`"
								:class="{fas: product.rating - n > -1, far: product.rating - n < 0}">
									</i>
							</div>
							<div>{{product.price}}</div>
							<button @click="$router.push({name: 'Edit'})">Edit</button>
							<router-view></router-view>
						</div>
					</div>
				</div>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import Header from '@/components/Header'

	export default {
		name: 'Product',
		data(){
			return {
				product: {}
			}
		},
		components: {
			Header
		},
		async created(){
			console.log(typeof this.$route.params.id);
			try {
				const response = await axios.get('/assets/products.json');
				this.product = response.data.products.filter((item) => item.id === +this.$route.params.id)[0]
			    this.product.image = '/' + this.product.image
		    
		  } catch (error) {
		  	console.error(error);
		  }
		}
	}
</script>
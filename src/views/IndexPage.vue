<template>
  <div>
    <Header :cartValue="cartValue"/>

	<main>
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="text-center">Catalog page</h1>
					<p v-show="getSearchValue.length > 0">
						<strong>Поиск по слову: </strong>
						<span style="font-size: 40px; margin: 0 30px;">{{getSearchValue}}</span>
						
						<button type="button" class="btn btn-primary"
							@click="clearSearch">Clear search</button></p>
					<!-- <p>{{sortedProducts}}</p> -->
					<!-- <p>{{sortProductsBySearchValue()}}</p> -->
					<hr>
				</div>
				<div class="col-12 col-xs-6">
					<div class="form-group">
						<label for="inputState">Category</label>
						<select id="inputState" class="form-control" v-model="selectedCat">
							<!-- <option selected>All</option> -->
							<option v-for="(skotnik, key) in categories" :value="key">{{skotnik}}</option>
						</select>
							</div>
				</div>
				<div class="col-12 col-xs-6">
					Price
					<iv-slider v-model="value" :min="min" :max="max" :showTip="showTip"></iv-slider>
				</div>
				
			</div>
			<ProductItem
				v-if="products.length > 0"
				v-for="product in sortedProducts"
				:product="product"
				:cartValue="cartValue"
				:cart="cart"
				:key="product.id"/>
			<div v-else>Skotnik</div>
		</div>
	</main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ProductItem from '@/components/ProductItem.vue'
import axios from 'axios'
import {mapGetters} from 'vuex'
import { db } from '@/firebase'


export default {
	name: 'iMain',
	props: ['searchValue'],
	data() {
		return{
			message: 'Vue.js pet depot',
			products: [],
			selectedCat: 'all',
			categories: {
				dog: 'For dogs',
				cat: 'For cats',
				all: 'All',
			},
			 value: 5000,
			 min: 0,
			 max: 5000,
			 range: true,
			 showTip: "always"

		}
	},
	components: {
	 	Header,
	 	ProductItem
	},
	methods: {
		submit(){
			alert('Submitted!');
		},
		slideEnd(){
			// console.log('slide-end')
			// console.log(this.value)
		},
		clearSearch(){
			this.$store.commit('setSearchValue', '')
		}
	},
	firebase: {
		products: db.ref('products'),
	},
	watch: {
		getSearchValue(){
			console.log('search value changed!')
			// this.products = this.products.filter(item => item.title.toLowerCase().indexOf(this.getSearchValue) !== -1)

			// this.sortProductsBySearchValue(this.getSearchValue)
			// console.log(this.products)
			// console.log(this.products.filter(item => item.title.toLowerCase().indexOf(this.getSearchValue)) !== -1)
		}
	},
	computed: {
		...mapGetters(['getProducts', 'getCart', 'getSearchValue']),
		cartValue(){
			return this.getCart.length;
		},
		filteredProducts(){
			// console.log(this.selectedCat);
			console.log(this.getSearchValue.length > 0);

			let newProducts = this.getSearchValue.length == 0 ? this.products : this.products.filter(item => item.title.toLowerCase().indexOf(this.getSearchValue) !== -1)
			
			if(this.selectedCat !== 'all'){
				newProducts = this.products.filter(item => item.category === this.selectedCat)

			}
			if(this.selectedCat === 'all'){
				newProducts =  this.getSearchValue.length == 0 ? this.products : this.products.filter(item => item.title.toLowerCase().indexOf(this.getSearchValue) !== -1)
			}
			if(this.getSearchValue.length > 0){
				newProducts = newProducts.filter(item => item.title.toLowerCase().indexOf(this.getSearchValue) !== -1)
			}
			// if(searchValue){
			// 	newProducts = newProducts.filter(item => item.title.indexOf(searchValue) !==1)
			// }
			console.log(newProducts);
			return newProducts.filter(item => item.price >= 0 && item.price <= this.value)
		},
		sortedProducts(){
			return this.filteredProducts.sort((a, b) => {
				if(a.title.toLowerCase() > b.title.toLowerCase()){
					return 1
				}
				if(a.title.toLowerCase() < b.title.toLowerCase()){
					return -1
				}
				return 0

			})
		},
		cart(){
			return this.$store.getters.getCart

		}
		
	},
	created(){    
		this.$store.dispatch('fetchProducts')
		console.log('created' + this.$route.params.searchValue)
		// try {
		// 	const response = await axios.get('./assets/products.json');
		// 	// console.log(response);
		// 	this.products = response.data.products
		//     // console.log(Array.isArray(this.products));
		    
		//   } catch (error) {
		//   	console.error(error);
		//   }
		},
		mounted(){
			console.log('mounted' + this.$route.params.searchValue)
		}
	}
</script>

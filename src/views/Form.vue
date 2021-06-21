<template>
	<div>
		<Header :message="message" :cartValue="cartValue"></Header>
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="text-center">Order page</h1>
					<hr>

					<table v-if="getCart.length" class="table table-striped">
						<thead>
					    <tr>
					      <th scope="col">№</th>
					      <th scope="col">Название</th>
					      <th scope="col">Количество</th>
					      <th scope="col">Цена</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr v-for="(product, ind) in getCart" :key="product.id">
					      <th scope="col">{{ind + 1}}</th>
					      <td>
					      	<img :src="product.image" width="50" alt="">
					      {{product.title}}</td>
					      <td>{{product.inCart}}</td>
					      <td>{{product.inCart * product.price | currencyFilter}}</td>
					    </tr>
					  </tbody>
					</table>

					<h3 v-else>Your card is empty</h3>
				</div>
				<div class="col-12">
					<h2 class="text-right">Total: <span class="badge badge-secondary">{{getTotal | currencyFilter}}</span></h2>
				</div>	
				<div class="col-12">
					<h1>Order form</h1>
					<form>
						<div class="form-row">
							<div class="form-group col-md-6">
								<label for="inputEmail4">Eirst name</label>
								<input type="text" class="form-control" id="inputEmail4" v-model="order.firstName">
							</div>
							<div class="form-group col-md-6">
								<label for="inputPassword4">Last name</label>
								<input type="text" class="form-control" id="inputPassword4" v-model="order.lastName">
							</div>
						</div>
						<div class="form-group">
							<label for="inputAddress">Address</label>
							<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="order.address">
						</div>

						<div class="form-row">
							<div class="form-group col-md-6">
								<label for="inputCity">City</label>
								<input type="text" class="form-control" id="inputCity"  v-model="order.city">
							</div>
							<div class="form-group col-md-4">
								<label for="inputState">State</label>
								<select id="inputState" class="form-control" v-model="order.state">
									<option selected>Choose...</option>
									<option v-for="(value, key) in order.states" :value="value">{{key}}</option>
								</select>
							</div>
							<div class="form-group col-md-2">
								<label for="inputZip">Zip</label>
								<input type="text" class="form-control" id="inputZip" v-model:number="order.zipCode">
							</div>
						</div>
						<div class="form-row">
							<div class="form-group col-md-6">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" id="gridCheck"
									v-model="order.gift" 
									:true-value="order.packingGift"
									:false-value="order.dontPackingGift">
									<label class="form-check-label" for="gridCheck">
										Ship is a gift?
									</label>
								</div>
							</div>
							<div class="form-group col-md-6">
								<div class="form-check">
									<input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" 
									:value="order.homeAddr" 
									v-model="order.method">
									<label class="form-check-label" for="gridRadios1">
										Home
									</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
									:value="order.businessAddr" 
									v-model="order.method">
									<label class="form-check-label" for="gridRadios2">
										Business
									</label>
								</div>
							</div>

						</div>
						<button type="submit" class="btn btn-primary"
						@click="submit">Submit</button>
					</form>
					<!-- Product order -->
					<!-- <pre>
						{{order}}
					</pre> -->
				</div>

			</div>
		</div>
		
	</div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header'
import {mapGetters} from 'vuex'

export default {
  name: 'Form',
  data(){
  	return {
  		message: 'Vue.js pet depot',
  		order: {
				firstName: '',
				lastName: '',
				address: '',
				city: '',
				state: '',
				zipCode: '',
				gift: 'Packing a gift',
				packingGift: 'Packing a gift',
				dontPackingGift: 'Do not packing a gift',
				method: 'Home address',
				businessAddr: 'Business address',
				homeAddr: 'Home address',
				states: {
					AL: "Alabama",
					AR: 'Arozna',
					CA: 'California',
					NV: 'Nevada'
				}
			}
  	}
  },
  components: {
  	Header
  },
  methods: {
		submit(){
			alert('Submitted!');
		}
	},
	computed: {
		...mapGetters(['getCart']),
		cartValue(){
			return this.$store.getters.getCart.length
		},
		getTotal(){
			return this.getCart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.inCart), 0)
		}
	}
}
</script>

<style>
	@media screen and (max-width: 480px) {
		thead th:first-child,
		tbody th{
			display: none;
		}
		tbody tr{
			text-align: center;
		}
		tbody tr img{
			display: block;
			margin: 0 auto;
		}
	}
</style>
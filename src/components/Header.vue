<template>
  <header class="mb-5 pt-2">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex header-inner">
            <h1><router-link to="/">Vue.js pet depot</router-link></h1>

            <div class="input-group order-3 order-lg-2">
              <input type="text" class="form-control" name="text" placeholder="Search..." v-model="search">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                  @click="querySend">Найти</button>
              </div>
            </div>

            <!-- <router-link tag="button" type="button" to="/catalog" class="btn btn-success">Catalog</router-link> -->

            <div tag="nav" active-class="bg-secondary" class="navbar navbar-right navbar-light bg-light ml-auto order-2 order-lg-3">
              <!-- <div class="btn-group mr-4" role="group" aria-label="Basic example">
                <button v-if="!getSession" type="button" class="btn btn-secondary"
                  @click="signIn">Войти</button>
                <button v-else type="button" class="btn btn-secondary"
                  @click="signOut"><img :src="getSession.photoURL" alt="">Выйти</button>
              </div> -->
              <router-link  to="/cart">
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-cart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </router-link>
              <span class="ml-1 mr-1">{{cartValue}}</span>
              <router-link to="/form" class="navbar-brand mb-0 h1 ml-1">Checkout</router-link>
              <!-- <pre>{{cart}}</pre> -->
            </div>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
export default {
  name: 'Header',
  data() {
    return{
      search: ''
    }
  },
  props: {
    cartValue: Number
  },
  methods: {
    querySend(){
      // console.log()
      // console.log(this.$route)
      this.$store.commit('setSearchValue', this.search.toLowerCase())
      if( this.searchValue !== '' && this.$route.name !== 'Catalog'){
        this.$router.push('/catalog')
      }
      this.search = ''
    },
    showCheckout(){
      this.$router.push('/form')
    },
    signIn(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    signOut(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }
  },
  computed: {
    getSession(){
      return this.$store.getters.getSession
    }
  },
  beforeCreate(){
       firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        console.log('zaregan')
          this.$store.commit('setSession', user)
        } else {
          console.log('ne zaregan')
          this.$store.commit('setSession', false)
        }
      });
     }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bg-secondary{
  border-radius: 5px;
  background-color: #6c757d !important;
}
.bg-secondary .navbar-brand{
  color: #fff;
}
.bg-secondary .bi-cart-fill{
  fill: #fff;
}
.btn img{
  max-width: 30px;
  margin-right: 10px;
}
.header-inner{
  align-items: center;
  h1{
    @include max-screen(786px){
      flex: 1 0 100%;
    }  
  }
  
}
.input-group{
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.navbar-brand{

  text-decoration: underline;
}
@media screen and (max-width: 992px) {
    .header-inner{
      flex-wrap: wrap;
    }

    .header-inner .nav{

    }
    .input-group{
      flex: 1 0 100%;
      margin-left: 0;
      margin-right: 0;
      max-width: none;
      margin-top: 30px;
    }
 }
 @media screen and (max-width: 576px) {

    .navbar{
      flex: 1 0 100%;
      display: flex;
    }
    .navbar > span{
      margin-right: auto !important;
    }
 }
 @media screen and (max-width: 576px) {
  .header-inner h1{
    font-size: 2rem;
  }
 }
</style>

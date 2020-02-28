<template>
  <div>
    <nav class="flex flex-row items-center">
        <svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" @click="$store.dispatch('sidebar/toggleSidebar')">
            <path d="M7.701 14.276l9.586-9.585a2.267 2.267 0 013.195 0l.801.8a2.266 2.266 0 010 3.194L13.968 16l7.315 7.315a2.266 2.266 0 010 3.194l-.801.8a2.265 2.265 0 01-3.195 0l-9.586-9.587A2.24 2.24 0 017.054 16a2.248 2.248 0 01.647-1.724z" fill="#515151"/>
        </svg>
        <div v-if="toggleSidebar" class="backdrop" @click="$store.dispatch('sidebar/toggleSidebar')"></div>
        <transition name="slide-side">
            <Cart v-if="toggleSidebar" />
        </transition>
        <div v-show="$route.name == 'products'" class="inline-flex">
          <h1 class="text-xl" >List of products</h1>
          <button class="ml-2 border px-4 rounded-full inline-flex items-center hover:bg-red-300" @click="toggleFavorites"> 
            <svg :class="{ 'fill-current text-red-500' : toggle }" class="feather feather-heart mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            Only
          </button>
        </div>
        <h1 class="text-xl" v-show="$route.name == 'cart'">Cart</h1>
      </nav>
    <nuxt />
  </div>
</template>

<script>
import Cart from '@/pages/cart'

export default {
  components: { Cart },
  data: () => ({
    toggle: false
  }),
  computed: {
      destination() {
        return (this.$route.name == 'products') ? 'cart' : 'products'
      },
      toggleSidebar() {
        return this.$store.getters['sidebar/toggleSidebar']
      }
  },
  methods: {
    toggleFavorites() {
      this.toggle ? this.$store.dispatch('products/fetchProducts', 0) : this.$store.dispatch('products/fetchFavoriteProducts')
      this.toggle = !this.toggle
    }
  }
}
</script>

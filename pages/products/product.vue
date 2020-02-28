<template>
    <section class="relative sm:w-1/2 md:w-1/3 xl:w-1/6 mb-4 shadow-lg flex flex-wrap mb-2 mx-2 rounded content-between">
        <div class="flex flex-wrap">
            <figure>
                <img class="w-full rounded-t-lg" :src="product.image_url" alt="Img" />
                <div class="absolute top-0 right-0 p-2" @click="$store.dispatch('products/updateFavoriteProduct', product)">
                    <svg :class="{ 'fill-current text-red-500': (product.favorite != 0) }" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                </div>
            </figure>
            <div class="container px-6 py-4 flex flex-wrap">
                <div class="font-bold text-xl mb-2">{{ product.productName }}</div>
                <p class="text-gray-700 text-base">{{ product.productDescription }}</p>
            </div>
        </div>
        <div v-show="successMessage" class="bg-teal-100 border-l-4 border-r-4 border-green-500 text-teal-700 p-4 w-full" role="alert">
            <p class="font-bold">Success!</p>
        </div>
        <div v-show="errorMessage" class="bg-red-100 border-l-4 border-r-4 border-red-400 px-5 py-3 relative w-full" role="alert">
            <p class="font-bold">{{ errorMessage }}</p>
        </div>
        <div class="container flex justify-between pt-2">
            <div class="px-6">
                <p class="text-blue-600 text-xl leading-none">{{ product.price }} €</p>
                <p class="text-sm" v-if="product.stock > 0">{{ product.stock }} left</p>
                <p class="text-sm text-red-600" v-else>Out of stock</p>
            </div>
            <button class="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded inline-flex" 
                @click="addToCart(product)">
                <svg class="fill-current text-white mr-2" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M22.5 14H14v8.5a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V14H.5a.5.5 0 01-.5-.5v-4A.5.5 0 01.5 9H9V.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V9h8.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5z" fill-rule="evenodd"/>
                </svg>
                <span>Add</span>
            </button>
        </div>
    </section>
</template>

<script>

export default {
    props: ['product'],
    data() {
        return {
            successMessage: null,
            errorMessage: null
        }
    },
    methods: {
        addToCart(product) {
            if (product.stock > 0) {
                this.$store.dispatch('cart/addToCart', product).then(() => {
                    this.$store.dispatch('products/takeFromStock', product)
                    this.successMessage = 'Success!'
                    setTimeout(() => { this.successMessage = null }, 3000)
                })
            } else {
                this.errorMessage = 'No items left!'
                setTimeout(() => { this.errorMessage = null }, 3000)
            }
        }
    }
}
</script>
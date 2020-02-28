<template>
    <div>
        <div v-show="!products.length" class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mt-2" role="alert">
            <p class="font-bold">Please wait!</p>
            <p class="text-sm">Loading data...</p>
            </div>
        <section class="flex content-start flex-wrap rounded" v-if="products.length > 0">
            <Product v-for="product in products" :key="product.id" :product="product" />
        </section>
    </div>
</template>

<script>
import Product from './product'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    components: { Product },
    computed: {
        products() { 
            return this.$store.getters['products/products']
        }
    },
    mounted() {
        window.addEventListener('scroll', () => this.bottom = this.bottomVisible())
        this.$store.dispatch('products/fetchProducts')
    },
    methods: {
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        }
    },
    data: () => ({ bottom: false }),
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.$store.dispatch('products/fetchProducts')
            }
        }
    }
}
</script>
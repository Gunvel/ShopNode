Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        //     [
        //         {
        //             "id": 0,
        //             "img": "featured1.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 1,
        //             "img": "featured7.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 2,
        //             "img": "featured3.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 3,
        //             "img": "featured4.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 4,
        //             "img": "featured8.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 5,
        //             "img": "featured9.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 6,
        //             "img": "featured10.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 7,
        //             "img": "featured11.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         },
        //         {
        //             "id": 8,
        //             "img": "featured12.jpg",
        //             "title": "ELLERY X M'O CAPSULE",
        //             "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        //             "price": 52.00
        //         }
        //     ];
    },
    methods: {
        filter(userSearch) {
            console.log(`search ${userSearch}`);
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        }
    },
    template: `
                <div class="b-featured b-featured_catalogPageOffset container">
                
                    <div class="b-featured__notFound" v-show="!filtered || filtered.length == 0">
                        <img src="assets/img/notFoundProduct.png"/>
                        <div>Products not found</div>
                    </div>
        
                    <div class="b-featured__itemsContainer">
                        <product v-for="item of filtered" :key="item.id" :product="item" @add-product="$parent.$refs.cart.addProduct"></product>
                    </div>

                    <div class="b-pageSelector b-featured__pageSelector">
                        <button class="b-pageSelector__button">
                            <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z"/>
                            </svg>
                        </button>

                        <div class="b-pageSelector__numbersContainer">
                            <a class="b-pageSelector__text b-pageSelector__text_offset b-pageSelector__text_hover" href="/">1</a>
                            <a class="b-pageSelector__text b-pageSelector__text_offset b-pageSelector__text_hover" href="/">2</a>
                            <a class="b-pageSelector__text b-pageSelector__text_offset b-pageSelector__text_hover" href="/">3</a>
                            <a class="b-pageSelector__text b-pageSelector__text_offset b-pageSelector__text_hover" href="/">4</a>
                            <a class="b-pageSelector__text b-pageSelector__text_offset b-pageSelector__text_hover" href="/">5</a>
                            <a class="b-pageSelector__text b-pageSelector__text_hover" href="/">6</a>
                            <div class="b-pageSelector__text">.....</div>
                            <a class="b-pageSelector__text b-pageSelector__text_hover" href="/">20</a>
                        </div>

                        <button class="b-pageSelector__button">
                            <svg width="9" height="14" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.994995 12L5.995 7L0.994995 2L1.995 0L8.995 7L1.995 14L0.994995 12Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                `
});

Vue.component('product', {
    props: ['product'],
    template: `
            <div class="b-featuredItem">
                <div class="b-featuredItem__imageWrapper">
                    <img :src="$root.getImgURL(product.img)" @error="$event.target.src='https://via.placeholder.com/360x420'" :alt="product.img">

                    <div class="b-featuredItem__darkLayout">
                        <button class="b-featuredItem__button" @click="$emit('add-product', product)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="29" viewBox="0 0 32 29">
                                <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>

               <div class="b-featuredItem__content">
                    <div class="b-featuredItem__title">{{ product.title }}</div>
                    <div class="b-featuredItem__descr">{{ product.description }}</div>
                    <div class="b-featuredItem__price">\${{ product.price.toFixed(2) }}</div>
                </div>
            </div>
            `
});

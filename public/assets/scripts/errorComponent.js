Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    computed: {
        isVisible() {
            return this.text !== ''
        }
    },
    template: `
            <div class="b-error" v-if="isVisible">
                <button class="b-error__button" @click="text=''">
                    <div class="b-error__container">
                        <div class="b-error__title">
                            An error occurred while processing the request
                        </div>
                        <div class="b-error__description">{{ text }}</div>
                    </div>
                </button>
            </div>
            `
});
<template>
    <div class="container">
        <div>
            <button @click="toggle">{{ toggleTheme }}</button>
            <button @click="changeInstructions">Instructions</button>
        </div>
        <div class="person">
            <person-details @event-list="handleCustomEvent"></person-details>
        </div>
    </div>
</template>

<script>

import personDetails from './PersonDetails.vue'
export default {
    components: {
        personDetails
    },
    emits: ['toggle-color', 'toggle-instructions', 'name-input'],
    data() {
        return {
            toggleColor: false,
            toggleInstructions: false,
            validator: false,
            nameToAssign: '',
            enableInput: true
        }
    },
    computed: {
        toggleTheme() {
            if (!this.toggleColor) {
                return "Light"
            } else {
                return "Dark"
            }
        }
    },
    methods: {
        handleCustomEvent(name) {
            this.nameToAssign = name;
            this.enableInput = false;
            this.$emit('name-input', this.nameToAssign, this.enableInput)

        },
        toggle() {
            this.toggleColor = !this.toggleColor
            this.$emit('toggle-color', this.toggleColor)

        },
        changeInstructions() {
            this.toggleInstructions = !this.toggleInstructions;
            this.$emit('toggle-instructions', this.toggleInstructions)

            if (this.toggleInstructions) {
                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 100);
            }


        }
    }

}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}
</style>
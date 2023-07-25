<template>
    <div class="user">

        <button @click="submit">{{ submitButton }}</button>

        <ul v-if="validator">
            <li v-for="(value, key) in person">User : {{ value }}</li>
        </ul>
        <div v-if="!validator" class="submit-name">
            <input type="text" placeholder="Name" v-model="person.name">

        </div>

    </div>
</template>

<script>
export default {
    emits: ['event-list'],
    data() {
        return {
            person: {
                name: '',

            },
            validator: false
        };
    },
    methods: {
        submit() {
            this.$emit('event-list', this.person.name)
            this.validator = !this.validator
        }
    },

    computed: {
        submitButton() {

            if (this.validator) {
                return "Edit"
            } else {
                return "Submit"
            }
        }
    }
}

</script>


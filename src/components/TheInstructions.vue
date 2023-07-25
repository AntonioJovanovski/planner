<template>
    <div class="instructions-container">
        <section>
            <div>
                <h4>Adding goals</h4>
                <p>To add goals, enter your username in the navigation bar, then add the goal in the input.
                    To add goals to finished, left click on the goal. To remove goals, right click on the goal.
                </p>
            </div>
            <div>
                <h4>Add goal to finished</h4>
                <p>To add a goal to goal history, left click on the goal.
                    You can set your goal target with the input.
                </p>
            </div>

            <div>
                <h4>Goal History</h4>
                <p>To remove goal from history, left click on the goal.
                    To remove all goals from history, click on the "clear all" button.
                </p>
            </div>
            <button @click="hide">Hide</button>

        </section>
        
    </div>
   
</template>

<script>
export default {
    methods: {
        hide() {
            this.$emit('hide')
        }
    }
}
</script>

<style>
.instructions-container {
    position: absolute;

}
</style>
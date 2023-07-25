<template>
    <div class="wrapper">
        <div>
            <div class="mini">
                <h2>Goal History</h2>
                <button @click="clearHistory">Clear All</button>
            </div>


        </div>
    </div>
    <div>
        <ul>
            <li v-for="(goal, index) in goalHistory" @click="removeGoal(index, goal)">{{ goal }}</li>

        </ul>
    </div>
</template>

<script>
export default {
    emits: ['clear-history', 'history-data'],
    props: ['goalHistory'],
    data() {
        return {

        }
    },
    methods: {
        clearHistory() {
            this.$emit('clear-history');
            fetch(`https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/history.json`, {
                method: 'DELETE'
            })
        },
        removeGoal(idx, deleteGoal) {
            const goalToDelete = deleteGoal

            this.goalHistory.splice(idx, 1)
            this.delete(goalToDelete)
        },
        delete(goalToDelete) {
            fetch(`https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/history.json`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    for (const goalId in data) {
                        if (data[goalId].goalHistory === goalToDelete) {
                            return fetch(
                                `https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/history/${goalId}.json`,
                                {
                                    method: 'DELETE',
                                }
                            );
                        }
                    }
                })
        },
    },
    mounted() {
        fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/history.json').then((response) => {

            if (response.ok) {
                return response.json();
            }
        }
        ).then((data) => {
            const results = [];
            for (const id in data) {
                results.push(
                    data[id].goalHistory
                )
            }
            this.$emit('history-data', results);
        })
    },
}


</script>

<style scoped>
.mini {
    text-align: center;
}
</style>

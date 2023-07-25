<template>
    <div>
        <div class="wrapper">

            <div>
                <h2 class="target">Goal target <input type="number" v-model="goalTarget"></h2>
                <h4>Finished Goals: {{ goalCount }} </h4>
            </div>

            <div v-if="barValidation" class="goal-bar">
                <div :style="barStyle()"></div>
            </div>
        </div>
        <ul>
            <li v-for="(goal, index) in moveGoal" :key="goal" @click="moveToHistory(index, goal)">{{ goal }}
                <i class="fa-solid fa-check"></i>
            </li>


        </ul>
        <li v-if="targetValidation">{{ congrats }}</li>
    </div>
</template>

<script>
export default {
    emits: ['goal-decrement', 'goal-data', 'count-update'],
    props: [
        'moveGoal',
        'goalCount',
        'assignedName'
    ],
    emits: [],

    data() {
        return {
            finGoal: [],
            goalTarget: 0,
            targetValidation: false,
            barValidation: false,
            allGoals: []
        }

    },
    mounted() {

        fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/finished-goals.json').then((response) => {

            if (response.ok) {
                return response.json();
            }
        }
        ).then((data) => {
            const results = [];
            for (const id in data) {

                results.push(

                    data[id].finishedGoals

                )
            }
            this.$emit('goal-data', results);

        });


    },
    updated() {
        if (this.goalTarget < 0) {
            this.goalTarget = 0
        };
    },
    computed: {
        congrats() {
            if (this.goalCount === this.goalTarget && this.goalCount !== 0) {

                return "Congratulations" + " " + this.assignedName + ", you finished " + this.goalTarget + " goals!"
            }
        }
    },
    methods: {
        barStyle() {
            if (this.goalCount * (100 / this.goalTarget) >= 100) {
                return
            }
            else if (this.goalCount === 0) {
                return { width: 0 + "%" }
            } else {
                return { width: this.goalCount * (100 / this.goalTarget) + '%' };

            }
        },
        moveToHistory(idx, finGoal) {
            const goalToDelete = finGoal
            this.finGoal.push(finGoal)
            this.moveGoal.splice(idx, 1)
            this.$emit('goal-decrement', finGoal)

            fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/history.json', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/jfson'
                },
                body: JSON.stringify({
                    goalHistory: finGoal
                }
                ),
            })
            this.delete(goalToDelete)
        },
        delete(goalToDelete) {
            fetch(`https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/finished-goals.json`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    for (const goalId in data) {
                        if (data[goalId].finishedGoals === goalToDelete) {
                            return fetch(
                                `https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/finished-goals/${goalId}.json`,
                                {
                                    method: 'DELETE',
                                }
                            );
                        }
                    }
                })
        },
    },
    watch: {
        goalCount(goalValue) {
            if (goalValue === this.goalTarget && goalValue !== 0) {
                this.targetValidation = true
            } else if (goalValue < this.goalTarget || goalValue > this.goalTarget) {
                this.targetValidation = false
            }
        },
        goalTarget(val) {
            if (val >= this.goalCount) {
                this.barValidation = true

            } else if (val < this.goalCount) {
                this.barValidation = false
            }

            if (val === this.goalCount && val !== 0) {

                this.targetValidation = true

            } else if (val < this.goalCount || val > this.goalCount) {
                this.targetValidation = false
            }
        },
        moveGoal(value) {
            this.$emit('count-update', value)
        }

    }

}
</script>

<style scoped>
.wrapper {
    text-align: center;
}

.target {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.target input {
    
    width: 60px;
}
.goal-bar {
    background-color: aliceblue;
    height: 20px;
    border-radius: 15px;
}

.goal-bar div {
    background-color: aqua;
    height: 20px;
    border-radius: 15px;
}
</style>
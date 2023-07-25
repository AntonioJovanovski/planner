<template>
  <the-nav 
  @toggle-color="changeTheme" 
  @toggle-instructions="toggleInstructions"
  @name-input="handleCustomEvent"></the-nav>
  <section :class="{ 'light-mode': toggleColor }">

    <teleport to="body">
      <the-instructions 
      v-if="theInstructions"
       @hide="hide"></the-instructions>
    </teleport>
    <base-card>
      <div class="wrapper">
        <h2>Add Goals </h2>
        <form @submit.prevent="addGoal">
          <input :disabled="enableInput" type="text" :placeholder="placeholder" v-model="enteredValue">
        </form>

        <button 
        @click="addGoal" 
        :disabled="enableInput">Add the Goal</button>
      </div>
      <div class="goal-wrapepr">
        <p 
        v-if="goals.length === 0">No goals added</p>
        <ul v-else>
          <li v-for="(goal, index) in goals" 
          @click="addToFinished(index, goal)" 
          :key="goal"
          @click.right="removeGoal(index)">{{ goal }} </li>

        </ul>

      </div>
    </base-card>
    <base-card>
      <finished-goals 
      :move-goal="finishedGoals" 
      :goal-count="goalCount" 
      :assigned-name="nameToAssign"
      @goal-decrement="addToHistory" 
      @goal-data="changeFinishedGoal" 
      @count-update="countUpdate"></finished-goals>
    </base-card>

    <base-card>
      <goal-history 
      :goal-history="goalHistory" 
      @clear-history="goalHistory = []"
      @history-data="changeData"></goal-history>
    </base-card>
  </section>
</template>

<script>

import theInstructions from './components/TheInstructions.vue'
import theNav from './components/TheNav.vue'
export default {
  components: {
    theInstructions: theInstructions,
    theNav
  },

  data() {
    return {
      goals: [],
      enteredValue: '',
      goalCount: 0,
      toggleColor: false,
      finishedGoals: [],
      nameToAssign: '',
      goalHistory: [],
      enableInput: true,
      theInstructions: false
    };
  },

  mounted() {
    fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/goals.json').then((response) => {

      if (response.ok) {
        return response.json();
      }
    }
    ).then((data) => {
      const results = [];
      for (const id in data) {

        results.push(

          data[id].goal

        )
      }
      this.goals = results

    });

    setTimeout(() => {
      fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals.json', {
        method: 'DELETE',


      }).then(resp => {
        location.reload();
      })

    }, 3600000); // 1 hour
  },
  methods: {
    toggleInstructions(value) {
      this.theInstructions = value
    },
    changeTheme(value) {
      this.toggleColor = value
    },
    changeData(data) {
      this.goalHistory = data
    },
    handleCustomEvent(name, input) {
      this.nameToAssign = name;
      this.enableInput = input

    },
    addGoal() {
      if (this.enteredValue === '') {
        return
      }

      this.goals.push(this.enteredValue);



      fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/goals.json', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          goal: this.enteredValue
        }
        ),
      })
      this.enteredValue = ''
    },

    addToFinished(idx, finGoal) {
      const goalToDelete = finGoal
      this.finishedGoals.push(finGoal)
      this.goals.splice(idx, 1)
      this.goalCount++
      this.warning = false
      fetch('https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/finished-goals.json', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          finishedGoals: finGoal
        }
        ),
      })
      this.delete(goalToDelete)
    },
    delete(goalToDelete) {

      fetch(`https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/goals.json`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          for (const goalId in data) {
            if (data[goalId].goal === goalToDelete) {
              return fetch(
                `https://my-planner-41de3-default-rtdb.firebaseio.com/all-goals/goals/${goalId}.json`,
                {
                  method: 'DELETE',
                }
              );
            }
          }
        })
    },
    removeGoal(idx) {
      const goalToDelete = this.goals[idx]
      this.goals.splice(idx, 1)
      this.warning = false;
      this.delete(goalToDelete)

    },
    addToHistory(goal) {
      this.goalCount--
      this.goalHistory.push(goal)


    },
    changeFinishedGoal(data) {
      this.finishedGoals = data
    },
    countUpdate(value) {
      this.goalCount = value.length
    },
    hide() {
      this.theInstructions = false
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

  },
  computed: {
    placeholder() {
      if (this.enableInput === true) {
        return "Add user info before adding goals"
      } else {
        return "Add Goals"
      }
    },

  },
  watch: {
    warning(one, two) {

    }
  },

}

</script>

<style>
body {
  background-color: rgb(93, 218, 93);
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

section.light-mode {
  background-color: rgb(0, 60, 0);
}

section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin: 0;
}

section div {
  width: 400px;

}

@media only screen and (max-width: 600px) {
  section div {
    width: 300px;
  }
}

button {
  padding: 6px 12px;
  border-radius: 15px;
  border: none;
  background-color: yellow;
  margin: 6px;
}

button:hover {
  cursor: pointer;
}

.container {
  margin: 10px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

input {
  border-radius: 15px;
  padding: 6px 12px;
  border: none;
  margin: 6px;
}

li {
  width: auto;
  height: auto;
  border: 1px solid black;
  list-style: none;
  padding: 6px 12px;
  border-radius: 15px;
  margin: 4px 0;
}

ul {
  padding: 0;
}
</style>



import { createApp } from 'vue'
import App from './App.vue'
import personDetails from './components/PersonDetails.vue'
import finishedGoals from './components/FinishedGoals.vue'
import goalHistory from './components/GoalHistory.vue'
import baseCard from './components/BaseCard.vue'

const app = createApp(App);


app.component('finished-goals', finishedGoals)
app.component('goal-history', goalHistory)
app.component('base-card', baseCard)

app.mount('#app')

removeGoal(index) {
  const goalToDelete = this.goals[index];

  fetch(`https://my-planner-41de3-default-rtdb.firebaseio.com/goals.json`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      for (const goalId in data) {
        if (data[goalId].goal === goalToDelete) {
          return fetch(
            `https://my-planner-41de3-default-rtdb.firebaseio.com/goals/${goalId}.json`,
            {
              method: 'DELETE',
            }
          );
        }
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('Goal successfully deleted');
        this.goals.splice(index, 1);
      } else {
        console.log('Failed to delete goal');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

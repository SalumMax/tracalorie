class CalorieTracker {
  constructor() {
    this._calorieLimit = 2001;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCaloriesTotal();
    this._displayColoriesConsumed();
    this._displayColoriesBurned();
    this._displayCaloriesRemaining();
  }

  // Public methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private methods

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector("#calories-total");
    totalCaloriesEl.innerHTML = this._totalCalories;
  }
  _displayCalorieLimit() {
    const calorieLimitEl = document.querySelector("#calories-limit");
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayColoriesConsumed() {
    let totalCaloriesConsumed = this._meals.reduce(
      (acc, current) => acc + current.calories,
      0
    );
    let caloriesConsumedEl = document.querySelector("#calories-consumed");
    caloriesConsumedEl.innerHTML = totalCaloriesConsumed;
    return totalCaloriesConsumed;
  }
  _displayColoriesBurned() {
    let totalCaloriesBurned = this._workouts.reduce(
      (acc, current) => acc + current.calories,
      0
    );
    let caloriesBurnedEl = document.querySelector("#calories-burned");
    caloriesBurnedEl.innerHTML = totalCaloriesBurned;
    return totalCaloriesBurned;
  }

  _displayCaloriesRemaining() {
    const remainingEl = document.querySelector("#calories-remaining");
    const progressEl = document.querySelector("#calorie-progress");

    let remainingElCard = remainingEl.parentElement;
    let remaining = this._calorieLimit - this._totalCalories;
    remainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      remainingElCard.classList.remove("bg-light");
      remainingElCard.classList.add("bg-danger");
      progressEl.classList.remove('bg-success');
      progressEl.classList.add("bg-danger");
    } else {
        remainingElCard.classList.remove("bg-danger");
        remainingElCard.classList.add("bg-light");
        progressEl.classList.remove('bg-danger');
        progressEl.classList.add("bg-success");
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.querySelector("#calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100); // returns percentage or 100 but not more than 100
    progressEl.style.width = `${width}%`; // setting this way adds only 'width:' to the existing (if any) style of the element
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCalorieLimit();
    this._displayColoriesConsumed();
    this._displayColoriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2) //generates hexadecimal number 
        this.name = name;
        this.calories = calories;
    }
}
class Workout {
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2)
        this.name = name;
        this.calories = calories;
    }
}

class App {
    constructor(){
        this._tracker = new CalorieTracker();
        document.querySelector('#meal-form')
                .addEventListener('submit', this._newItem.bind(this, 'meal'))
        document.querySelector('#workout-form')
                .addEventListener('submit', this._newItem.bind(this, 'workout'))
    }
    
    _newItem(type, e){
        e.preventDefault();
        const name = document.querySelector(`#${type}-name`);
        const calories = document.querySelector(`#${type}-calories` );

        //validation of inputs 
        if(name.value === '' || calories.value === ''){
            alert('Please fill in all fields')
            return 
        }

        if(type === 'meal'){
            const meal = new Meal(name.value, +calories.value)
            this._tracker.addMeal(meal)
        } else {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }

        name.value = '';
        calories.value = '';

        // collapses the meal form once an item is added 
        const collapseItem = document.querySelector(`#collapse-${type}`)
        const bsCollapse = new bootstrap.Collapse(collapseItem, {
            toggle: true
        })
       
    }

    
   
}

const app = new App();


  
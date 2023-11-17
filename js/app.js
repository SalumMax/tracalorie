class CalorieTracker{
    constructor (){
        this._calorieLimit = 2001;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._displayCaloriesTotal()
        this._displayColoriesConsumed()
        this._displayColoriesBurned()
        this._displayCaloriesRemaining()
    }

    // Public methods 

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalories += meal.calories;
        this._render()
    }
    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -= workout.calories;
        this._render()
    }

    // Private methods 

    _displayCaloriesTotal(){
        const totalCaloriesEl = document.querySelector('#calories-total')
        totalCaloriesEl.innerHTML = this._totalCalories;
    }
    _displayCalorieLimit(){
        const calorieLimitEl = document.querySelector('#calories-limit')
        calorieLimitEl.innerHTML = this._calorieLimit;
    }

    _displayColoriesConsumed(){
        let totalCaloriesConsumed = this._meals.reduce((acc, current) => acc + current.calories, 0) 
        let caloriesConsumedEl = document.querySelector('#calories-consumed')
        caloriesConsumedEl.innerHTML = totalCaloriesConsumed
        return totalCaloriesConsumed
    }
    _displayColoriesBurned(){
        let totalCaloriesBurned = this._workouts.reduce((acc, current) => acc + current.calories, 0) 
        let caloriesBurnedEl = document.querySelector('#calories-burned')
        caloriesBurnedEl.innerHTML = totalCaloriesBurned
        return totalCaloriesBurned
    }

    _displayCaloriesRemaining(){
        let remainingEl = document.querySelector('#calories-remaining')
       let remaining = this._calorieLimit - this._totalCalories;
       remainingEl.innerHTML = remaining;
    }

    _displayCaloriesProgress(){
        const progressEl = document.querySelector('#calorie-progress')
        const width = (this._totalCalories/this._calorieLimit) * 100
        progressEl.setAttribute('style', `width: ${width}%`);

    }

    _render(){
        this._displayCaloriesTotal()
        this._displayCalorieLimit()
        this._displayColoriesConsumed()
        this._displayColoriesBurned()
        this._displayCaloriesRemaining()
        this._displayCaloriesProgress()
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

 const tracker = new CalorieTracker();

 const breakfast = new Meal('Breakfast', 401);
 const lunch = new Meal('Lunch', 1200);
 const dinner = new Meal('Dinner', 605);
 tracker.addMeal(breakfast);
 tracker.addMeal(lunch);
 tracker.addMeal(dinner);

 const run = new Workout ('Run', 450);
 const gym = new Workout ('Gym', 850);

 tracker.addWorkout(run);
 tracker.addWorkout(gym);

  
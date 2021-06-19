// Library code
function createStore (reducer) {
    // in charge of the store, which is composed of...4 things
    // 1. the state
    // 2. API / way to get the state
    // 3. way to listen for changes on the state
    // 4. way to Updaate the state

    //state = in charge of holding the whole state
    let state
    let listeners = []

    // in change of getting the whole state
    const getState = () => state

    //takes listeners array, and pushes the funciton that was called
    //for the sake of the logs
    const subscribe = (listener) => {
        listeners.push(listener)
        //return a function filtering out the original listener if user wants to later unsubscribe
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    // responsible for updating the state in the actual store
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    //whenever createStore is envoked, they will get an object 
    //in order to access the internal state of the store
    return {
        getState,
        subscribe,
        dispatch,
    }

}

// App code

// add variables for listeneres, this avoids posibility of typos
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'


// edit state by adding action
// this is a reducer funciton
// reduces request into a brand new state (must be a pure function)
function todos(state = [], action) {
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id === action.id
                ? Object.assign({}, todo, {complete: !todo.complete} )
                : todo)
        default:
            return state
    }
}

//goals reducer
function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

// create function that calls each individual reducer for the createStore function
function app (state = {}, action) {
    return {
        //prepare todos
        todos: todos(state.todos, action),
        //prepare goals portion of the state
        goals: goals(state.goals, action),
    }
}



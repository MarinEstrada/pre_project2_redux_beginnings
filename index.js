function createStore () {
    // in charge of the store, which is composed of...4 things
    // 1. the state
    // 2. API / way to get the state
    // 3. way to listen for changes on the state
    // 4. way to Updaate the state

    //in charge of holding the whole state
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

    //whenever createStore is envoked, they will get an object 
    //in order to access the internal state of the store
    return {
        getState,
        subscribe,
    }

}

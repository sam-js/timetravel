import { createStore, combineReducers } from 'redux'
import app from './reducers.js'
import present from './present.js'
import nap from './nap.js'
import state from './state.js'
import dispatch from './actions.js'
import { saveSnapshot, getSnapshot } from './timeTravelStore.js' 

const createModel = () => {
  let listeners = []
  let store = {
    counter: 5,
  }
  let currentState = state(store)
  saveSnapshot({}, store)


  const loadSnapshot = i => {
    store = getSnapshot(i)
    updateState()
  }

  const updateState = _ => {
    // Rebuild state
    currentState = state(store)
    console.log('New state:', currentState)

    // Pub to listeners
    listeners.forEach(listener => listener(currentState))

    // Call nap
    nap(currentState)(dispatch(present))
  }


  const present = dataset => {
    console.log('Present:', dataset)

    // Store mutations
    if (dataset.increaseBy !== undefined) {
      store.counter += dataset.increaseBy
    }

    console.log('Store after mutations:', store)

    // Save Store to TimeTravelStore
    saveSnapshot(dataset, store)

    updateState()

  }

  const subscribe = listener => {
    listeners.push(listener)
    // Send current state to new listener
    listener(currentState)

    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  return {
    subscribe,
    present,
    getState: _ => currentState,
    loadSnapshot,
  }
}

export default createModel()

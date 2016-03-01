// Input: Store (from Model)
// Output: State (to View and nap)
const state = store => {
  return {
    counter: store.counter,
    isSix: (store.counter == 6),
    moreThanFive: (store.counter > 5),
  }
}

export default state

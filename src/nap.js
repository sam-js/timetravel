// Input: State
// Output: NAP, i.e. a function which accepts a function (dispatch) and may or may not call it
const nap = state => {
  return dispatch => {

    if (state.counter == 7) {
      dispatch({ type: 'INC' })
    }

  }
}

export default nap

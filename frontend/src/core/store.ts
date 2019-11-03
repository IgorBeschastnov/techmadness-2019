export const INCREMENT_REQUESTED = 'store/INCREMENT_REQUESTED'
export const INCREMENT = 'store/INCREMENT'
export const DECREMENT_REQUESTED = 'store/DECREMENT_REQUESTED'
export const DECREMENT = 'store/DECREMENT'
export const LOG_IN = 'store/LOG_IN'
export const LOG_OUT = 'store/LOG_OUT'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
  isLogin: false
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogin: true
      }

      case LOG_OUT:
        return {
          ...state,
          isLogin: false
        }

    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const increment = () => {
  return (dispatch:any) => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const login = () => {
  return (dispatch:any) => {
    dispatch({
      type: LOG_IN
    })

    dispatch({
      type: LOG_IN
    })
  }
}

export const logout = () => {
  return (dispatch:any) => {
    dispatch({
      type: LOG_OUT
    })

    dispatch({
      type: LOG_OUT
    })
  }
}

export const incrementAsync = () => {
  return (dispatch: any) => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return (dispatch: any) => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return (dispatch: any) => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}

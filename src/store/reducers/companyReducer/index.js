function reducer (state = {}, action) {
    console.log('reducer chala CART', action)
    switch(action.type) {
        case 'SET_COMPANY': {
            return { ...state, company: action.data }
        }
        default: {
            return state
        }
    }
}

export default reducer
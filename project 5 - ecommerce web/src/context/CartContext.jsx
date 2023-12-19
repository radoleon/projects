import { createContext, useReducer } from 'react'

export const CartContext = createContext()

function cartReducer(state, action) {
    switch(action.type) {
        case "ADD_TO_CART":
            
            if (state.find(item => item.id === action.payload.id)) {
                return state.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: (parseInt(item.quantity) + action.payload.quantity),
                            total: item.total + action.payload.total,
                        }
                    }
                    else return item
                })
            }

            return [...state, action.payload]

        case "REMOVE_FROM_CART":
            return state.filter(item => item.id !== action.payload)

        case "EMPTY_CART":
            return []
        
        default:
            return state
    }
}

export function CartContextProvider({ children }) {
    
    const [cartState, cartDispatch] = useReducer(cartReducer, [])

    return (
        <CartContext.Provider value={{cartState, cartDispatch}}>
            { children }
        </CartContext.Provider>
    )
}

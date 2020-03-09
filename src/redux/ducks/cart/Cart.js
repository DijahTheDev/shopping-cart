import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ADD_CART = "products/ADD_CART"
const DEL_CART = "products/DEL_CART"
const DEL_ALL = "products/DEL_ALL"

const initialState = {
  cart: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      const exists =
        state.cart.filter(product => product.id === action.payload.id).length >
        0
      if (exists) {
        const item = state.cart.find(
          product => product.id === action.payload.id
        )
        item.quantity = item.quantity + 1

        return {
          ...state,
          cart: state.cart.map(p => (item.id === p.id ? item : p))
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        }
      }
    case DEL_CART:
      if (state.cart.find(item => item.id === action.payload).quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload)
        }
      } else {
        return {
          ...state,
          cart: state.cart.map(item => {
            if (item.id === action.payload) {
              item.quantity = item.quantity - 1
              return item
            } else {
              return item
            }
          })
        }
      }
    case DEL_ALL:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      }

    default:
      return state
  }
}

function addCart(product) {
  return {
    type: ADD_CART,
    payload: product
  }
}

function delCart(productId) {
  return {
    type: DEL_CART,
    payload: productId
  }
}

function delAll(item) {
  return {
    type: DEL_ALL,
    payload: item
  }
}

export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector(appState => appState.cartState.cart)
  const add = product => dispatch(addCart(product))
  const del = item => dispatch(delCart(item))
  const delAllItems = item => dispatch(delAll(item))

  useEffect(() => {}, [dispatch])
  return { add, cart, del, delAllItems }
}

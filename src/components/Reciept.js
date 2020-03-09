import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../hooks"

// import { TiShoppingCart } from "react-icons/ti"

export default props => {
  const { cart } = useCart()

  const total = cart.reduce((a, b) => {
    return a + b.price * b.quantity
  }, 0)

  return (
    <div className="receiptWrapper">
      <div className="receiptThankYou">
        <h1>Thank you for your order!</h1>
        <h2>Order confirmed</h2>
        <h3>Receipt</h3>
      </div>
      {cart.map(item => (
        <div className="receiptItem" key={"item" + item.id}>
          <div className="receiptItemDesc">
            <p className="receiptTitle">{item.title}</p>
            <p className="receiptStyle">{item.style}</p>
            <p className="receiptQuantity">Quantity: {item.quantity}</p>
          </div>
          <div className="receiptItem2">
            <p className="receiptItemPrice">${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="receiptFooter">
        <div className="receiptSubtotal">
          <p>SUBTOTAL</p>
          <div>
            <p className="receiptFooterPrice">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

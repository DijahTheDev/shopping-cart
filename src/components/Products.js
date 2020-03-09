import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useProducts, useCart } from "../hooks"
import "../styles/products.css"
import { TiShoppingCart } from "react-icons/ti"

export default props => {
  const { products, count } = useProducts()
  const { cart, add, del, delAllItems } = useCart()
  const [show, setShow] = useState(false)
  const total = cart.reduce((a, b) => {
    return a + b.price * b.quantity
  }, 0)

  return (
    <div className="wrapper">
      <div className="orderSelect">
        <p>{count} Product(s) found.</p>
        <div>
          <label htmlFor="orderBy">Order by </label>

          <select id="orderBy">
            <option value="select">Select</option>
            <option value="LowestToHighest">Lowest To highest</option>
            <option value="HighestToLowest">Highest To lowest</option>
          </select>
        </div>
      </div>
      <div className="grid">
        {products.map(product => (
          <div
            className="centerGridItems"
            onClick={e => add(product)}
            key={"product" + product.id}
          >
            <p className={product.isFreeShipping ? "free" : "costs"}>
              Free Shipping
            </p>
            <img
              className="productImgs"
              key={"product" + product.id}
              src={product.img.normal}
              alt="mens shirts"
            />
            <p>{product.title}</p>
            <div className="smallBorder"></div>
            <p className="pricing">${product.price.toFixed(2)}</p>
            <p className="installments">
              or {product.installments} x{product.currencyFormat}
              {(product.price / product.installments).toFixed(2)}
            </p>
            <button className="addToCart">Add to Cart</button>
          </div>
        ))}
      </div>

      <div className={show ? "cart" : "unseen"}>
        <button className="cartButton" onClick={e => setShow(!show)}>
          <TiShoppingCart />
        </button>
        <div className="cartHeader">
          <p>
            {" "}
            <TiShoppingCart />
          </p>
          <p>Cart</p>
        </div>
        <div className="cartAllItems">
          {cart.map(item => (
            <div className="cartItems" key={"item" + item.id}>
              <div>
                <img
                  className="thumbs"
                  key={"item" + item.id}
                  src={item.img.thumb}
                  alt="mens shirts"
                />
              </div>
              <div className="itemInfo">
                <p className="itemTitle">{item.title}</p>
                <p className="itemStyle">{item.style}</p>
                <p className="quantityCount">Quantity: {item.quantity}</p>
              </div>
              <div className="itemTotals">
                <button
                  type="button"
                  className="delButton"
                  onClick={e => delAllItems(item.id)}
                >
                  x
                </button>
                <p className="itemPrice">${item.price.toFixed(2)}</p>
                <div className="quantitiesButtons">
                  <button
                    onClick={e => del(item.id)}
                    className="lessQuantity"
                    type="button"
                  >
                    -
                  </button>
                  <button
                    onClick={e => add(item)}
                    className="moreQuantity"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absoluteFooter">
          <div className="cartFooter">
            <p>SUBTOTAL</p>
            <div>
              <p className="grandSubTotal">${total.toFixed(2)}</p>
            </div>
          </div>
          <div className="">
            <Link
              className="linkToCheckout"
              to={{ pathname: "/checkout", data: cart }}
            >
              <div className="checkoutButton">
                <button className="checkoutButtonButton">Checkout</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

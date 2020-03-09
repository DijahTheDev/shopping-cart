import React from "react"
import { Route } from "react-router-dom"
import "../styles/App.css"
import Products from "./Products"
import Checkout from "./Checkout.js"
import Receipt from "./Reciept.js"

export default props => {
  return (
    <div>
      <Route exact path="/" component={Products}></Route>
      <Route path="/Checkout" component={Checkout}></Route>
      <Route path="/reciept" component={Receipt}></Route>
    </div>
  )
}

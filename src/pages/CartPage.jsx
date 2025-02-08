import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { qntyInc, qntyDec, proDelete } from "../cartSlice";
import { PiCurrencyInrBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Cart = useSelector(state => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totAmount = 0;
  const ans = Cart.map((key) => {
    totAmount += key.price * key.qnty;
    return (
      <>
        <tr>
          <td><img src={key.image} width="100" height="100" /></td>
          <td> {key.name} </td>
          <td> {key.description} </td>
          <td> {key.price} </td>
          <td>

            <FaMinusCircle onClick={() => { dispatch(qntyDec({ id: key.id })) }} />
            {key.qnty}
            <FaPlusCircle onClick={() => { dispatch(qntyInc({ id: key.id })) }} />

          </td>
          <td> {key.price * key.qnty}  </td>
          <td style={{ color: "red", fontSize: "25px" }}>
            <MdDelete onClick={() => { dispatch(proDelete(key.id)) }} />
          </td>
        </tr>
      </>
    )
  })

  return (
    <>
      <h1 > My Cart</h1>


      <hr />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th> Quantity </th>
            <th> Total</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {ans}
        </tbody>

        <h1 >
          <Button variant="warning" onClick={() => { navigate("/checkout") }}>Checkout</Button>
        </h1>
        <h3 >
          <PiCurrencyInrBold /> {totAmount}
        </h3>

      </Table>

    </>
  )
}
export default Cart;
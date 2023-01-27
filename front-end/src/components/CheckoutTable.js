import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';

export default function CheckoutTable() {
  const [drinks, setDrinks] = useState([]);
  const [quantityCart, setQuantityCart] = useState([]);
  const { saveToLocal, getToLocal } = useContext(Context);
  const location = useLocation();

  const setNewDrinks = (i, value) => {
    const newDrinks = drinks.map((drink, ind) => {
      if (ind === i) {
        return { ...drink, quantity: value };
      }
      return drink;
    });
    setDrinks(newDrinks);
    saveToLocal('cartDrinks', newDrinks);
  };

  const setTotal = () => {
    const totalPrice = drinks.reduce((a, b) => a + Number(b.price * b.quantity), 0)
      .toFixed(2).toString().replace('.', ',');
    saveToLocal('totalPrice', totalPrice);
    return totalPrice;
  };

  const handleChange = ({ target: { value, id } }) => {
    console.log(id);
    const newQuantitys = quantityCart.map((quantity, i) => {
      if (i === Number(id) && value > 0) {
        setNewDrinks(i, value);
        return value;
      }
      return quantity;
    });
    setQuantityCart(newQuantitys);
  };

  const setSubTotal = (price, quantity) => {
    const numberTotal = Number(price * quantity);
    const subTotal = numberTotal.toFixed(2).toString().replace('.', ',');
    return `R$ ${subTotal}`;
  };

  useEffect(() => {
    const cartDrinks = getToLocal('cartDrinks');
    setDrinks(cartDrinks);
    setQuantityCart(cartDrinks.map((d) => d.quantity));
  }, []);

  useEffect(() => {
    saveToLocal('cartDrinks', drinks);
  }, [drinks]);

  const removeDrink = (id) => {
    const newDrinks = drinks.filter((d) => d.id !== id);
    setDrinks(newDrinks);
  };

  return (
    <table className="table-checkout">
      <thead className="line-checkout">
        <tr>
          <th className="line-checkout">Item</th>
          <th className="line-checkout">Descrição</th>
          <th className="line-checkout">Quantidade</th>
          <th className="line-checkout">Valor Unitário</th>
          <th className="line-checkout">Sub-total</th>
          <th className="line-checkout">Remover Item</th>
        </tr>
      </thead>
      <tbody>
        { drinks.map((drink, index) => {
          const { id, name, price, quantity } = drink;
          const subTotal = setSubTotal(price, quantity);
          return (
            <tr key={ id }>
              <td
                className="line-checkout"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </td>
              <td
                className="line-checkout"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { name }

              </td>
              <td
                className="line-checkout"
              >
                <input
                  type="number"
                  id={ index }
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                  onChange={ handleChange }
                  value={ quantityCart[index] }
                />

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {price}

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { subTotal }

              </td>
              {
                location.pathname === '/customer/checkout' ? (
                  <td
                    className="line-checkout"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    <button type="button" onClick={ () => removeDrink(id) }>
                      Remover
                    </button>
                  </td>
                ) : null
              }
            </tr>
          );
        }) }
      </tbody>
      <tfoot>
        <tr>
          <td className="line-checkout total-value">
            {' '}
            Total: R$
            <div data-testid="customer_checkout__element-order-total-price">
              { setTotal() }
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

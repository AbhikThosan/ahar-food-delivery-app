import { useSelector } from "react-redux";
import CartPerRestaurant from "../components/CartPerRestaurant";

function Cart() {
  const cart = useSelector((state) => state.cart);

  function groupByRestaurant(cartData) {
    return cartData.reduce((result, item) => {
      const { restaurant } = item;
      if (!result[restaurant]) {
        result[restaurant] = [];
      }
      result[restaurant].push(item);
      return result;
    }, {});
  }

  const groupedByRestaurant = groupByRestaurant(cart);
  const restaurants = Object.keys(groupedByRestaurant);

  return restaurants.map((item) => (
    <CartPerRestaurant
      restaurantName={item}
      restaurantCart={groupedByRestaurant[item]}
      key={item}
    />
  ));
}

export default Cart;

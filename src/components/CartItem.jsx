import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem } from "../redux/cartSlice";

function CartItem({ cartMeal }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log(cart);
  console.log(cartMeal);

  const cartItemFromCart = cart.find((item) => item.mealid === cartMeal.mealid);
  const basePrice = cartItemFromCart.basePrice;
  const [variation, setVariation] = useState(cartItemFromCart.variation);
  const [price, setPrice] = useState(cartItemFromCart.price);
  const [quantity, setQuantity] = useState(cartItemFromCart.quantity);

  useEffect(() => {
    let newPrice = basePrice;
    switch (variation) {
      case "1:1":
        newPrice = basePrice * quantity;
        break;
      case "1:3":
        newPrice = (basePrice * 3 - 80) * quantity;
        break;
      case "1:5":
        newPrice = (basePrice * 5 - 120) * quantity;
        break;
      default:
        newPrice = basePrice * quantity;
    }
    setPrice(newPrice);

    dispatch(
      updateCartItem({
        mealid: cartMeal.mealid,
        variation,
        price: newPrice,
        quantity,
      })
    );
  }, [variation, quantity, basePrice, dispatch, cartMeal.mealid]);

  const handleQuantityIncrement = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };
  const handleQuantityDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleVariationChange = (option) => {
    setVariation(option);
  };

  return (
    <div className="flex items-center justify-center py-[20px] border-b-2">
      <div className="flex items-center">
        <img
          src={cartMeal.image}
          alt=""
          className="inline-block w-[10%] h-[10%] rounded-xl"
        />
        <div className="ml-[20px]">
          <h2 className="font-semibold text-xl text-slate-500">
            {cartMeal.title}
          </h2>
          <p className="font-medium text-base text-slate-400">
            {cartMeal.ingredients}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 text-red-500 border-r-2">
        <p className="font-semibold text-lg">Variations</p>
        <div className="flex gap-4 items-center rounded-xl font-semibold text-lg mr-4">
          <button
            className={`inline-block text-slate-600 h-[40px] w-[40px] bg-red-300 hover:bg-red-400 rounded-xl ${
              variation === "1:1" ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleVariationChange("1:1")}
          >
            1:1
          </button>
          <button
            className={`inline-block text-slate-600 h-[40px] w-[40px] bg-red-300 hover:bg-red-400 rounded-xl ${
              variation === "1:3" ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleVariationChange("1:3")}
          >
            1:3
          </button>
          <button
            className={`inline-block text-slate-600 h-[40px] w-[40px] bg-red-300 hover:bg-red-400 rounded-xl ${
              variation === "1:5" ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleVariationChange("1:5")}
          >
            1:5
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 text-red-500 ml-4">
        <p className="font-semibold text-lg">TK {price}</p>
        <div className="flex gap-4 bg-red-300 items-center rounded-xl font-semibold text-lg">
          <button
            className="inline-block text-slate-600 h-[40px] w-[40px] hover:bg-red-400 rounded-xl"
            onClick={handleQuantityDecrement}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="inline-block text-slate-600 h-[40px] w-[40px] hover:bg-red-400 rounded-xl"
            onClick={handleQuantityIncrement}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

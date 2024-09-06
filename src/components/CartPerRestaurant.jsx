import { useState } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function CartPerRestaurant({ restaurantCart, restaurantName }) {
  const cart = useSelector((state) => state.cart);

  const [deliveryFee] = useState(Math.floor(Math.random() * 30 + 30));
  const [discount, setDiscount] = useState(0);
  const [discountFirstOrder] = useState(Math.floor(Math.random() * 80 + 20));
  const [discountWelcomeBack] = useState(Math.floor(Math.random() * 30 + 20));
  const [discountRegularDeal] = useState(Math.floor(Math.random() * 20 + 10));
  const [deliveryTime] = useState(Math.floor(Math.random() * 30) + 20);

  const subtotal = cart.reduce((total, item) => {
    return item.restaurant === restaurantName ? total + item.price : total;
  }, 0);

  const handleDiscountChange = (discountValue) => {
    setDiscount(discountValue);
  };
  return (
    <div className="w-[80%] m-auto">
      <h2 className="text-slate-600 font-bold text-xl mt-3">
        Restaurant:{" "}
        <span className="text-white inline-block px-5 py-2 rounded-full bg-red-400">
          {restaurantName}
        </span>
      </h2>
      {restaurantCart.map((item) => (
        <CartItem cartMeal={item} key={item.mealid} />
      ))}

      <div className="text-slate-700 font-semibold text-xl flex flex-col my-[20px] ">
        <div className="flex justify-between items-center mb-[20px]">
          <p>Subtotal :</p> <span>Tk {subtotal}</span>
        </div>
        <div className="flex justify-between items-center border-b-2 pb-[10px]">
          <p>Delivery Fee:</p> <span>Tk {deliveryFee}</span>
        </div>
        <div className="flex justify-between items-center mt-[10px]">
          <p>Total : </p> <span>Tk {subtotal + deliveryFee}</span>
        </div>
      </div>
      <div className="text-slate-700 font-semibold text-xl border-b-2 pb-[10px]">
        <p className="mb-[10px]">Available Discount Code</p>
        <div className="flex flex-col gap-3 text-slate-600 text-lg font-semibold">
          <div className="flex justify-between items-center ml-4">
            <label className="block cursor-pointer">
              <input
                type="radio"
                name="discount"
                onChange={() => {
                  handleDiscountChange(discountFirstOrder);
                }}
                className="mr-2 cursor-pointer"
              />
              First Order [#ED569]
            </label>
            <p>-TK {discountFirstOrder}</p>
          </div>
          <div className="flex justify-between items-center ml-4">
            <label className="block cursor-pointer">
              <input
                type="radio"
                name="discount"
                onChange={() => {
                  handleDiscountChange(discountWelcomeBack);
                }}
                className="mr-2 cursor-pointer"
              />
              Welcome Back [#ONI2204]
            </label>
            <p>-TK {discountWelcomeBack}</p>
          </div>
          <div className="flex justify-between items-center ml-4">
            <label className="block cursor-pointer">
              <input
                type="radio"
                name="discount"
                onChange={() => {
                  handleDiscountChange(discountRegularDeal);
                }}
                className="mr-2 cursor-pointer"
              />
              Regular Deal [#ANT2204]
            </label>
            <p>-TK {discountRegularDeal}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-slate-700 font-semibold text-xl my-3">
        <p>
          Total <span>(after discount)</span> :{" "}
        </p>{" "}
        <span>Tk {subtotal + deliveryFee - discount}</span>
      </div>
      <div className="text-slate-700 font-semibold text-xl my-[20px]">
        <label>
          Address Details :
          <input
            type="text"
            onChange={() => {}}
            className="border-2 ml-[10px] rounded-xl p-2 inline-block w-[75%] text-slate-600 font-normal"
          />
        </label>
      </div>
      <div className="flex items-center text-slate-700 font-semibold text-xl my-[20px]">
        <p>Delivery Time:</p>{" "}
        <span className=" ml-[30px] bg-red-300 px-[20px] py-[10px] rounded-full">
          {deliveryTime} minutes
        </span>
      </div>
      <div className="text-center my-[50px] text-2xl font-bold text-white">
        <button className="bg-red-400 block w-full py-3 rounded-full hover:bg-red-500">
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default CartPerRestaurant;

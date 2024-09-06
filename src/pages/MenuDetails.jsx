import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getSingleMeal } from "../services/apiGetSingleMeal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function MenuDetails() {
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState("1:1");
  const [basePrice] = useState(Math.floor(Math.random() * 200) + 100);
  const navigate = useNavigate();
  const { mealid, restaurant } = useParams();

  const dispatch = useDispatch();

  const {
    data: meal,
    error: mealError,
    isLoading: isMealLoading,
  } = useQuery({
    queryKey: [`singleMeal-${mealid}`],
    queryFn: () => getSingleMeal(mealid),
  });

  function handleIncrement() {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  }
  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleOptionChange(e) {
    setSelectedVariation(e.target.value);
  }

  function handleEnterKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const price = getPriceForOption(selectedVariation);
    const cartItem = {
      mealid,
      restaurant,
      title: meal.meals[0].strMeal.split(" ").slice(0, 3).join(" "),
      image: meal.meals[0].strMealThumb,
      ingredients: `${meal.meals[0].strIngredient1}, ${meal.meals[0].strIngredient2}, ${meal.meals[0].strIngredient3}, ${meal.meals[0].strIngredient4}, ${meal.meals[0].strIngredient5},${meal.meals[0].strIngredient6}`,
      variation: selectedVariation,
      basePrice,
      price: price * quantity,
      quantity,
    };

    const itemExists = cart.find(
      (item) =>
        item.mealid === cartItem.mealid &&
        item.restaurant === cartItem.restaurant
    );

    if (itemExists) {
      alert("This item is already in the cart.");
    } else if (cart.length >= 5) {
      alert("Cart is full! New item cannot be added!");
    } else {
      dispatch(addToCart(cartItem));
      alert("Item added to the cart!");
    }

    navigate(-1);
  }

  function getPriceForOption(option) {
    switch (option) {
      case "1:1":
        return basePrice;
      case "1:3":
        return basePrice * 3 - 80;
      case "1:5":
        return basePrice * 5 - 120;
      default:
        return basePrice;
    }
  }

  if (isMealLoading) return <div>Loading...</div>;
  if (mealError) return <div>Error loading meal details.</div>;

  if (!meal || !meal.meals || meal.meals.length === 0) {
    return <div>No meal data available.</div>;
  }

  const title = meal.meals[0].strMeal.split(" ").slice(0, 3).join(" ");
  const ingredients = `${meal.meals[0].strIngredient1}, ${meal.meals[0].strIngredient2}, ${meal.meals[0].strIngredient3}, ${meal.meals[0].strIngredient4}, ${meal.meals[0].strIngredient5},${meal.meals[0].strIngredient6}`;
  const image = meal.meals[0].strMealThumb;
  const instructions = meal.meals[0].strInstructions;
  const totalPrice = getPriceForOption(selectedVariation) * quantity;

  return (
    <div className="my-[40px] flex flex-col rounded-xl border-2 border-red-400 w-[80%] m-auto">
      <div className="">
        <img src={image} alt="" className="block m-auto rounded-xl h-[50vh]" />
        <div className="flex mt-4 ml-4 items-center gap-6 text-slate-600 font-semibold text-3xl">
          <p>Restaurant : </p>
          <a
            href="#"
            className="bg-yellow-400 pt-2 pb-3 px-4 rounded-xl hover:bg-yellow-300 text-white"
          >
            {restaurant}
          </a>
        </div>
        <div className="flex my-4 ml-4 items-center gap-4 text-slate-600 font-semibold text-2xl">
          <p>Menu : </p>
          <h2>{title}</h2>
        </div>
        <p className="ml-4 mb-4 text-red-400 font-semibold text-2xl">{`TK ${getPriceForOption(
          "1:1"
        )}`}</p>
        <p className="m-4 mb-4 pb-4 text-slate-600 font-semibold text-lg border-b-2 border-red-200">
          {`${ingredients} etc.`}
        </p>
        <p className="m-4 mb-4 pb-4 text-slate-600 font-semibold text-sm border-b-2 border-red-200">
          {instructions}
        </p>
      </div>
      <div className="mx-4">
        <div className="flex mb-4 justify-between text-slate-600 font-semibold text-lg">
          <p className="">Variation</p>
          <p className="">Required</p>
        </div>
        <form
          className="flex flex-col gap-3 text-slate-600 text-lg font-semibold"
          onSubmit={handleSubmit}
          onKeyDown={handleEnterKeyDown}
        >
          <div className="flex justify-between items-center mx-4">
            <label className="block cursor-pointer">
              <input
                type="radio"
                name="ratio"
                value="1:1"
                checked={selectedVariation === "1:1"}
                onChange={handleOptionChange}
                className="mr-2 cursor-pointer"
              />
              1:1
            </label>
            <p>{`TK ${getPriceForOption("1:1")}`}</p>
          </div>
          <div className="flex justify-between items-center mx-4">
            <label className="block cursor-pointer">
              <input
                type="radio"
                name="ratio"
                value="1:3"
                checked={selectedVariation === "1:3"}
                onChange={handleOptionChange}
                className="mr-2 cursor-pointer"
              />
              1:3
            </label>
            <p>{`TK ${getPriceForOption("1:3")}`}</p>
          </div>
          <div className="flex justify-between items-center mx-4">
            <label className="block cursor-pointer">
              <input
                type="radio"
                name="ratio"
                value="1:5"
                checked={selectedVariation === "1:5"}
                onChange={handleOptionChange}
                className="mr-2 cursor-pointer"
              />
              1:5
            </label>
            <p>{`TK ${getPriceForOption("1:5")}`}</p>
          </div>
          <div className="flex justify-between items-center pt-3 px-4 border-t-2">
            <p>Total:</p>
            <p>{`TK ${totalPrice}`}</p>
          </div>

          <div className="flex justify-between items-center my-4">
            <div className="flex items-center">
              <button
                type="button"
                className="bg-red-500 inline-block rounded-full text-white h-[40px] w-[40px] hover:bg-red-400"
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-6">{quantity}</span>
              <button
                type="button"
                className="bg-red-500 inline-block rounded-full text-white h-[40px] w-[40px] hover:bg-red-400"
                onClick={handleIncrement}
                disabled={quantity >= 5}
              >
                +
              </button>
            </div>
            <Button
              content="Add to Cart"
              bgColor="bg-red-500"
              textColor="text-white"
              hoverBg="hover:bg-red-400"
              hoverText="hover:text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default MenuDetails;

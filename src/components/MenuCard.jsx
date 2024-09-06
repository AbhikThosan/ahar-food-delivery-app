import { FaStar } from "react-icons/fa";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import { getSingleMeal } from "../services/apiGetSingleMeal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const restaurantNames = [
  "Flavor Station",
  "Epicurean Hub",
  "Taste Haven",
  "Grub Hub",
  "Gourmet Spot",
  "Sizzle Spice",
  "Fork Road",
  "Crave Eats",
  "Foodtopia",
  "Appetite City",
  "Rolling Pan",
  "Spice Delight",
  "Chew Time",
  "Flavour Grill",
  "Aroma Angel",
  "Big Barbecue",
];

function MenuCard({ mealid, restaurantName = "" }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [restaurant] = useState(
    restaurantName === ""
      ? restaurantNames[Math.floor(Math.random() * 16)]
      : restaurantName
  );
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/menu-details/${mealid}/${restaurant}`);
  };
  const handleRestaurantClick = () => {
    navigate(`/restaurant/${restaurant}/${mealid}`);
  };

  const {
    data: meal,
    error: mealError,
    isLoading: isMealLoading,
  } = useQuery({
    queryKey: [`singleMeal-${mealid}`],
    queryFn: () => getSingleMeal(mealid),
  });

  if (isMealLoading) return <div>Loading...</div>;
  if (mealError) return <div>Error loading meal details.</div>;

  // Ensure meal and meals[0] exist before accessing their properties
  if (!meal || !meal.meals || meal.meals.length === 0) {
    return <div>No meal data available.</div>;
  }

  const title = meal.meals[0].strMeal.split(" ").slice(0, 3).join(" ");
  const ingredients = `${meal.meals[0].strIngredient1}, ${meal.meals[0].strIngredient2}, ${meal.meals[0].strIngredient3}, ${meal.meals[0].strIngredient4}, ${meal.meals[0].strIngredient5},${meal.meals[0].strIngredient6}`;
  const image = meal?.meals[0]?.strMealThumb;

  function handleOrderNow() {
    const basePrice = Math.floor(Math.random() * 200) + 100;
    const cartItem = {
      mealid,
      restaurant,
      title,
      image,
      ingredients,
      variation: "1:1",
      basePrice,
      price: basePrice,
      quantity: 1,
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
  }

  if (isMealLoading) return <div>Loading...</div>;
  return (
    <div className="max-w-80 flex flex-col justify-center items-center">
      <div className="relative">
        {restaurantName === "" && (
          <div className="flex justify-center items-center font-bold">
            <Button
              content={restaurant}
              bgColor="bg-yellow-500"
              textColor="text-white"
              hoverBg="hover:bg-yellow-400"
              hoverText="hover:text-white"
              onClick={handleRestaurantClick}
            />
          </div>
        )}
        <img
          src="../../assets/others/menu_card_decor.png"
          alt="decor"
          className="block mx-auto mb-[-90%]"
        />
        <img
          src={image}
          alt="menu"
          className="z-0 block m-auto h-[200px] w-[200px] rounded-full"
        />
        <p className="bg-yellow-400 rounded-full border-4 border-white flex items-center justify-center w-14 h-14 text-white mt-[-25%] ml-[68%] z-10 absolute">
          {`-${Math.floor(Math.random() * 15) + 5}%`}
        </p>
      </div>
      <div className="bg-gradient-to-b from-white to-red-100 rounded-xl mt-[-25px]">
        <div className="mt-[50px] flex justify-center items-center gap-3">
          <div className="flex justify-center">
            <img
              src="../../assets/avatars/avatar1.png"
              alt="user"
              className="inline-block mr-[-20px]"
            />
            <img
              src="../../assets/avatars/avatar1.png"
              alt="user"
              className="inline-block mr-[-20px]"
            />
            <img src="../../assets/avatars/avatar1.png" alt="user" />
          </div>
          <div className="flex justify-center items-center gap-1">
            <FaStar className="text-yellow-400 text-lg" />
            <p className="font-semibold text-lg">(4.5)</p>
          </div>
        </div>
        <h2 className="text-center font-bold text-2xl text-red-500 mt-[30px] mb-[20px]">
          {title}
        </h2>
        <p className="text-wrap px-[20px] text-justify mb-[30px]">
          {ingredients} etc.
        </p>
        <div className="flex items-center justify-center gap-3 mb-[-25px]">
          <Button
            content="Details"
            bgColor="bg-red-500"
            textColor="text-white"
            hoverBg="hover:bg-red-400"
            hoverText="hover:text-white"
            onClick={handleDetailsClick}
          />
          <Button
            content="Order Now"
            bgColor="bg-red-500"
            textColor="text-white"
            hoverBg="hover:bg-red-400"
            hoverText="hover:text-white"
            onClick={handleOrderNow}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuCard;

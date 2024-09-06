import { RiEBike2Fill } from "react-icons/ri";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { MdOutlineStarRate } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";
import Search from "../components/Search";
import FilterButtons from "../components/FilterButtons";
import SectionTitle from "../components/SectionTitle";
import MenuCard from "../components/MenuCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleMeal } from "../services/apiGetSingleMeal";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

function Restaurant() {
  const [active, setActive] = useState(0);
  const categories = useSelector((state) => state.category);
  const menuIdByCategory = useSelector((state) => state.menu);
  const { restaurant, mealid } = useParams();

  const {
    data: meal,
    error: mealError,
    isLoading: isMealLoading,
  } = useQuery({
    queryKey: [`singleMeal-${mealid}`],
    queryFn: () => getSingleMeal(mealid),
  });

  const mealCategory = useMemo(() => {
    if (meal && meal.meals && meal.meals.length > 0) {
      return [meal.meals[0].strCategory];
    }
    return [];
  }, [meal]);

  const getRandomCategories = (categories, mealCategory) => {
    const filteredCategories = categories.filter(
      (category) => !mealCategory.includes(category)
    );
    const shuffledCategories = filteredCategories.sort(
      () => 0.5 - Math.random()
    );
    const randomCategories = shuffledCategories.slice(0, 3);
    return [...mealCategory, ...randomCategories];
  };

  const RestaurantCategories = useMemo(() => {
    if (categories && mealCategory.length > 0) {
      return getRandomCategories(categories, mealCategory);
    }
    return [];
  }, [categories, mealCategory]);

  if (
    isMealLoading ||
    !categories ||
    categories.length === 0 ||
    !menuIdByCategory
  )
    return <div>Loading...</div>;
  if (mealError) return <div>Error loading meal details.</div>;

  if (!meal || !meal.meals || meal.meals.length === 0)
    return <div>No meal data available.</div>;

  const selectedCategory = menuIdByCategory[RestaurantCategories[active]];
  const mealNameKeys = Object.keys(selectedCategory);
  const selectedKeys = mealNameKeys?.slice(0, 8);
  const ids = selectedKeys.map((key) => selectedCategory[key]);
  const image = meal.meals[0].strMealThumb;

  console.log(RestaurantCategories);
  return (
    <div>
      <div className="my-[70px] flex">
        <div>
          <img
            src={image}
            alt=""
            className="inline-block h-[150px] w-[150px] rounded-xl border-4 border-red-400"
          />
        </div>
        <div className="ml-[30px] flex flex-col gap-2">
          <div className="flex justify-between items-center text-lg text-slate-400">
            {RestaurantCategories.map((item, index) => (
              <>
                <h3>{item}</h3>{" "}
                {RestaurantCategories.length !== index + 1 && <LuDot />}
              </>
            ))}
          </div>
          <h2 className="font-bold text-4xl">{restaurant}</h2>
          <div className="flex items-center gap-6 font-semibold text-slate-600">
            <p className="bg-slate-200 py-1 px-2 rounded-xl">OPEN</p>
            <div className="flex items-center gap-2">
              <RiEBike2Fill />
              <span>Delivery:</span>
              <span>20 min</span>
            </div>
            <div className="flex items-center gap-2">
              <RiShoppingBag4Fill />
              <span>40tk Minimum</span>
            </div>
          </div>
          <div className="flex font-semibold text-slate-600 items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <MdOutlineStarRate className="text-red-500" />
                <span className="font-thin">4.7/5</span>
                <span className="font-thin">(500+)</span>
              </div>
              <a href="">See reviews</a>
            </div>
            <a href="" className="flex items-center">
              <FiAlertCircle />
              <span>More info</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mb-[70px]">
        <SectionTitle content="Today's Manu" />
        <div className=" flex flex-wrap gap-8 items-center mb-[50px] justify-center">
          <FilterButtons
            categories={RestaurantCategories}
            active={active}
            setActive={setActive}
          />
        </div>
        <div className="flex justify-center flex-wrap gap-[70px] mt-[60px]">
          {ids?.map((item) => (
            <MenuCard key={item} mealid={item} restaurantName={restaurant} />
          ))}
        </div>
      </div>

      <div className="mb-[70px]">
        <SectionTitle content="Only For You" />
        <div className="flex justify-center flex-wrap gap-32 mt-[60px]">
          <MenuCard mealid={meal.meals[0].idMeal} restaurantName={restaurant} />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;

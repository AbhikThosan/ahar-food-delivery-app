import { useQueries, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Hero from "../ui/Hero";
import MenuSection from "../ui/MenuSection";
import SpecialOfferSection from "../ui/SpecialOfferSection";
import { getCategory } from "../services/apiGetCategory";
import { getMenusByCategory } from "../services/apiGetMenusByCategory";
import { useEffect, useMemo, useState } from "react";
import { setMealIds } from "../redux/menuSlice";
import { setCategory } from "../redux/categorySlice";
import { searchMeals } from "../utils/searchMeals";
import SearchedMenuSection from "../ui/SearchedMenuSection";

function Landing() {
  const [searchMenu, setSearchMenu] = useState("");
  const [searchSubmit, setSearchSubmit] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);

  const dispatch = useDispatch();
  // Fetch category data
  const {
    data: category,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  // Ensure category is an array before mapping
  const randomCategory = useMemo(() => {
    return Array.isArray(category?.categories)
      ? category.categories.map((item) => item.strCategory)
      : [];
  }, [category?.categories]);

  const menusByCategory = useQueries({
    queries: [
      {
        queryKey: [`menu${randomCategory[0]}`, randomCategory[0]],
        queryFn: () => getMenusByCategory(randomCategory[0]),
      },
      {
        queryKey: [`menu${randomCategory[1]}`, randomCategory[1]],
        queryFn: () => getMenusByCategory(randomCategory[1]),
      },
      {
        queryKey: [`menu${randomCategory[2]}`, randomCategory[2]],
        queryFn: () => getMenusByCategory(randomCategory[2]),
      },
      {
        queryKey: [`menu${randomCategory[3]}`, randomCategory[3]],
        queryFn: () => getMenusByCategory(randomCategory[3]),
      },
      {
        queryKey: [`menu${randomCategory[4]}`, randomCategory[4]],
        queryFn: () => getMenusByCategory(randomCategory[4]),
      },
      {
        queryKey: [`menu${randomCategory[5]}`, randomCategory[5]],
        queryFn: () => getMenusByCategory(randomCategory[5]),
      },
      {
        queryKey: [`menu${randomCategory[6]}`, randomCategory[6]],
        queryFn: () => getMenusByCategory(randomCategory[6]),
      },
      {
        queryKey: [`menu${randomCategory[7]}`, randomCategory[7]],
        queryFn: () => getMenusByCategory(randomCategory[7]),
      },
      {
        queryKey: [`menu${randomCategory[8]}`, randomCategory[8]],
        queryFn: () => getMenusByCategory(randomCategory[8]),
      },
      {
        queryKey: [`menu${randomCategory[9]}`, randomCategory[9]],
        queryFn: () => getMenusByCategory(randomCategory[9]),
      },
      {
        queryKey: [`menu${randomCategory[10]}`, randomCategory[10]],
        queryFn: () => getMenusByCategory(randomCategory[10]),
      },
      {
        queryKey: [`menu${randomCategory[11]}`, randomCategory[11]],
        queryFn: () => getMenusByCategory(randomCategory[11]),
      },
      {
        queryKey: [`menu${randomCategory[12]}`, randomCategory[12]],
        queryFn: () => getMenusByCategory(randomCategory[12]),
      },
      {
        queryKey: [`menu${randomCategory[13]}`, randomCategory[13]],
        queryFn: () => getMenusByCategory(randomCategory[13]),
      },
    ],
  });

  const categoryMealIds = useMemo(() => {
    return randomCategory.reduce((acc, category, index) => {
      const mealsData = menusByCategory[index]?.data?.meals;
      if (mealsData) {
        acc[category] = mealsData.reduce((mealAcc, meal) => {
          mealAcc[meal.strMeal] = meal.idMeal;
          return mealAcc;
        }, {});
      } else {
        acc[category] = {};
      }
      return acc;
    }, {});
  }, [menusByCategory, randomCategory]);

  useEffect(() => {
    if (randomCategory.length > 0) {
      dispatch(setCategory(randomCategory));
    }
  }, [randomCategory, dispatch]);

  useEffect(() => {
    if (Object.keys(categoryMealIds).length > 0) {
      dispatch(setMealIds(categoryMealIds));
    }
  }, [categoryMealIds, dispatch]);

  useEffect(() => {
    if (searchSubmit && searchMenu.trim()) {
      const results = searchMeals(categoryMealIds, searchMenu);
      setSearchedResults(results);
      setSearchSubmit(false);
    }
  }, [searchSubmit, searchMenu, categoryMealIds]);

  if (isCategoryLoading) return <div> Loading Menus....</div>;

  return (
    <div>
      <Hero
        searchMenu={searchMenu}
        setSearchMenu={setSearchMenu}
        setSearchSubmit={setSearchSubmit}
      />
      {!searchMenu && (
        <>
          <SpecialOfferSection />
          <MenuSection />
        </>
      )}
      {searchMenu && searchedResults.length > 0 && (
        <>
          <SearchedMenuSection searchedMeals={searchedResults} />
        </>
      )}
    </div>
  );
}

export default Landing;

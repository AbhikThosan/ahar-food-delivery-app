import { useState } from "react";
import { useSelector } from "react-redux";

import FilterButtons from "../components/FilterButtons";
import MenuCard from "../components/MenuCard";
import SectionTitle from "../components/SectionTitle";

function MenuSection() {
  const [active, setActive] = useState(0);

  const categories = useSelector((state) => state.category);
  const menuIdByCategory = useSelector((state) => state.menu);

  if (!categories || categories.length === 0 || !menuIdByCategory) {
    return <p>Loading...</p>;
  }

  const selectedCategory = menuIdByCategory[categories[active]];

  console.log(selectedCategory);

  if (!selectedCategory) {
    return <p>No data available for this category.</p>;
  }

  const mealNameKeys = Object.keys(selectedCategory);
  const selectedKeys = mealNameKeys?.slice(0, 8);
  const ids = selectedKeys.map((key) => selectedCategory[key]);

  return (
    <section className=" mb-[80px]">
      <SectionTitle content="Today's Menu" />
      <FilterButtons
        active={active}
        setActive={setActive}
        categories={categories}
      />
      <div className="flex justify-center flex-wrap gap-[70px] mt-[60px]">
        {ids?.map((item) => (
          <MenuCard key={item} mealid={item} />
        ))}
      </div>
    </section>
  );
}

export default MenuSection;

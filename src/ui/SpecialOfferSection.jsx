import { useSelector } from "react-redux";
import MenuCard from "../components/MenuCard";
import SectionTitle from "../components/SectionTitle";
import { randomMealIds } from "../utils/randomMealIds";

function SpecialOfferSection() {
  const menuIdByCategory = useSelector((state) => state.menu);

  console.log(menuIdByCategory);

  const randomMeals = randomMealIds(menuIdByCategory);

  return (
    <section className=" mb-[80px]">
      <SectionTitle content="Today's Special Offers" />
      <div className=" flex justify-center flex-wrap gap-[70px]">
        {randomMeals?.map((item, index) => (
          <MenuCard key={index} mealid={item} />
        ))}
      </div>
    </section>
  );
}

export default SpecialOfferSection;

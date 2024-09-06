import MenuCard from "../components/MenuCard";
import SectionTitle from "../components/SectionTitle";

function SearchedMenuSection({ searchedMeals }) {
  const ids = searchedMeals?.slice(0, 8);
  return (
    <section className=" mb-[80px]">
      <SectionTitle content="Search Results" />
      <div className=" flex justify-center flex-wrap gap-[70px]">
        {ids?.map((item, index) => (
          <MenuCard key={index} mealid={item} />
        ))}
      </div>
    </section>
  );
}

export default SearchedMenuSection;

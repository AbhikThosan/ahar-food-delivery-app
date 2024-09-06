import Button from "./Button";

function FilterButtons({ active, setActive, categories }) {
  const handleClick = (index) => {
    setActive(index);
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 font-semibold">
      {categories?.map((category, index) => (
        <Button
          key={index}
          content={category}
          active={index === active}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export default FilterButtons;

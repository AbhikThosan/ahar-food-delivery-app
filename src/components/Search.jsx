import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

function Search({ placeholder, searchMenu, setSearchMenu, setSearchSubmit }) {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (isTyping) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setSearchSubmit(true);
      }, 5000);
    } else if (!isTyping && searchMenu) {
      // Reset searchSubmit if the input is cleared
      setSearchSubmit(false);
    }

    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [isTyping, searchMenu, setSearchSubmit]);

  function handleSearch(e) {
    e.preventDefault();
    clearTimeout(typingTimeoutRef.current);
    setIsTyping(false);
    setSearchSubmit(true);
  }

  function handleInputChange(e) {
    setSearchMenu(e.target.value);
    setIsTyping(true);
  }

  return (
    <form
      className="flex items-center bg-white rounded-full border-2 h-[50px] pr-[5px] text-slate-700"
      onSubmit={handleSearch}
    >
      <IoSearch className="mx-[15px] text-2xl" />
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full outline-0"
        value={searchMenu}
        onChange={handleInputChange}
      />
      <button className="bg-yellow-400 rounded-full p-[5px]" type="submit">
        <IoSearch className="text-3xl text-white" />
      </button>
    </form>
  );
}

export default Search;

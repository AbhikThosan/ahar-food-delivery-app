import { NavLink } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

import Button from "../components/Button";
import { useSelector } from "react-redux";
const src = "../../assets/logo/ahar.png";

function Navbar() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="flex justify-between text-lg sticky top-0 z-[1000] bg-gradient-to-tr from-white to-red-50 rounded-full">
      <div>
        <NavLink to="/landing">
          <img className="h-16" src={src} alt="Logo" />
        </NavLink>
      </div>
      <div className="flex items-center justify-center">
        <CiLocationOn className="text-3xl pr-[5px]" />
        <span>Location: </span>
        <span className="pl-[10px] font-semibold">Chittagong</span>
      </div>
      <ul className="flex items-center justify-center">
        <li className="mr-[30px]">
          <Button
            content="Log in"
            bgColor="bg-red-500"
            textColor="text-white"
            hoverBg="hover:bg-red-400"
            hoverText="hover:text-white"
          />
        </li>
        <li className="mr-[30px]">
          <Button
            content="Sign up"
            bgColor="bg-red-500"
            textColor="text-white"
            hoverBg="hover:bg-red-400"
            hoverText="hover:text-white"
          />
        </li>
        <div className="relative">
          <li className=" border-2 border-slate-300 rounded-full p-[8px] hover:bg-red-400 hover:border-red-500 transition duration-[600ms] ease-in-out text-white bg-slate-700">
            <NavLink to="/cart">
              <BsCartCheckFill className="text-[30px]" />
            </NavLink>
          </li>
          <span className="text-white flex items-center justify-center w-[20px] h-[20px] rounded-full bg-yellow-400 text-xs mt-[-35%] ml-[68%] z-10 absolute">
            {cart.length}
          </span>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;

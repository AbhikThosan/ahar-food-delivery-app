import { FaStar } from "react-icons/fa";
import Search from "../components/Search";

const client = "../../assets/client/client.png";
const pizza = "../../assets/food/italianPizza.png";
const smiley = "../../assets/others/ya.png";

function Hero({ searchMenu, setSearchMenu, setSearchSubmit }) {
  return (
    <div className="text-black flex h-[400px] justify-between items-center mb-[20px]">
      <div className="w-2/4 pr-[30px]">
        <h1 className="text-[58px] font-black mb-[20px]">
          We&apos;re <span className="text-red-500">Serious</span> For{" "}
          <span className="text-red-500">Food</span> &{" "}
          <span className="text-amber-300">Delivery</span>.
        </h1>
        <p className="text-[25px] mb-[20px]">
          Best cooks and best delivery guys all at your service. Hot tasty food
          will reach you in 60 minutes.
        </p>
        <Search
          placeholder="Search Food"
          searchMenu={searchMenu}
          setSearchMenu={setSearchMenu}
          setSearchSubmit={setSearchSubmit}
        />
      </div>
      <div className="w-2/4 relative">
        <div className="h-[380px]">
          <img src={client} alt="client" className="h-full w-auto mx-auto" />
        </div>
        <div className="text-xs">
          <div className="absolute top-[20%] left-[15%] flex items-center justify-center bg-white px-[10px] py-[8px] rounded-xl">
            <div>
              <img src={pizza} alt="food" />
            </div>
            <div className="ml-[15px] flex flex-col gap-1">
              <h4>Italian Pizza</h4>
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>tk550</p>
            </div>
          </div>
          <div className="flex bg-white rounded-[28px] absolute top-[25%] right-[10%] px-[2px] py-[6px]">
            <img src={smiley} alt="smiley" />
            <div className="flex flex-col items-center justify-center pl-[5px] pr-[20px] ">
              <p className="text-center">Our Happy Customer</p>
              <div className="flex">
                <FaStar className=" text-yellow-400" />
                <p>
                  <span>4.9</span> (1089 Reviews)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

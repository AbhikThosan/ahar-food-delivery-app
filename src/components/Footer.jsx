import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center pb-6 bg-white pt-10 rounded-2xl font-medium text-slate-500">
      <div className="flex justify-around w-full border-b-2 pb-6">
        <div>
          <h2 className="text-red-500 text-3xl pb-[15px] font-semibold">
            Ahar App
          </h2>
          <p className="pb-[20px]">Will be in your pocket</p>
          <div className=" flex flex-col gap-3">
            <button>
              <img
                src="../../assets/logo/MobileAppPlaystore.png"
                alt="playstore"
              />
            </button>
            <button>
              <img
                src="../../assets/logo/MobileAppApplestore.png"
                alt="applestore"
              />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-red-500 text-3xl pb-[15px] font-semibold">
            Get In Touch
          </h2>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              <BiSolidPhoneCall />
              <p>+0085739--040</p>
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot />
              <p>CTG, Bangladesh</p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail />
              <p>ahar@gmail.com</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-red-500 text-3xl pb-[15px] font-semibold">
            Social
          </h2>
          <div className="flex flex-col gap-6 items-center text-xl">
            <a href="#" className="text-yellow-400 hover:text-red-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-yellow-400  hover:text-red-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-yellow-400  hover:text-red-500">
              <IoLogoYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <p>Copyright &copy; 2024 Ahar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

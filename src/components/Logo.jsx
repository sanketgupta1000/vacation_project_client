import { business } from "../config";

function Logo({ width = "100px" }) {
  return (
    <div className="">
      <img
        src={business.logoURL}
        alt="Logo"
        className="aspect-square w-16 lg:w-20 rounded-full border-red-400/50 border-4 shadow-xl shadow-black block mx-auto"
      />
    </div>
  );
}

export default Logo;

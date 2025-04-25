import React from "react";
import { Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/vendor-dashboard" className="flex items-center">
      <Layers className="h-8 w-8 text-teal-300" />
      <span className="ml-2 text-xl font-bold text-white">VendorHub</span>
    </Link>
  );
};

export default Logo;

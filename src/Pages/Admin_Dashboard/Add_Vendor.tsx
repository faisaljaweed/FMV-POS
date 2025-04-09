import { useState } from "react";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";

const Add_Vendor = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex flex-col gap-4 p-4 w-full h-full bg-white rounded-lg shadow-md">
      <h2 className="text-center text-xl font-extrabold text-gray-700">
        Add Vendor
      </h2>
      <form className="flex flex-col gap-4 w-full h-full">
        <div>
          <label className="mb-2 text-lg font-bold">UserName</label>
          <Input
            type="text"
            placeholder="Enter your UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 text-lg font-bold">Email</label>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 text-lg font-bold">Password</label>
          <Input
            type="password"
            placeholder="Enter your Paswword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 text-lg font-bold">Confirm Password</label>
          <Input
            type="password"
            placeholder="Enter your Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <CustomButton>Submit</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default Add_Vendor;

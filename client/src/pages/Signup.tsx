import React, { useEffect, useState } from "react";
import { SignupProp } from "../services/Props";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { SignupApi } from "../apis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
  const [inpType, setIntType] = useState("password");
  const [formDets, setFormDets] = useState<SignupProp>({
    name: "",
    email: "",
    password: "",
  });
  const [screenSize, setScreenSize] = useState(-1);
  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);
  const iconSize = screenSize >= 640 ? "medium" : "small";

  const handleChange = (e: any, id: number) => {
    e.preventDefault();
    if (id === 1) {
      setFormDets((prev) => ({
        ...prev,
        name: e.target.value,
      }));
    } else if (id === 2) {
      setFormDets((prev) => ({
        ...prev,
        email: e.target.value,
      }));
    } else if (id === 3) {
      setFormDets((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    }
  };

  const handleSubmit = async(e: React.MouseEvent) => {
    e.preventDefault();
    const res = await SignupApi(formDets);
    if (typeof res === "string") {
      toast.warn(res);
    } else {
      toast.success("User successfully created");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col relative items-center justify-center">
      <div className="wrapper w-[95%] mx-auto rounded-3xl flex flex-col gap-8">
        <div className="title w-full flex items-center justify-between">
          <h1 className="text-[1.5rem] font-[500]">
            Virtu<span>Cart</span>
          </h1>
          <h1 className="font-[600] text-[1.5rem]">
            Sign <span className="">Up</span>{" "}
          </h1>
        </div>
        <div className="form flex flex-col p-3 rounded-3xl border border-[#393939] gap-8">
          <div className="input1 flex flex-col gap-3">
            <label htmlFor="">
              Enter your <span>full name</span>
            </label>
            <input
              type="text"
              className="bg-transparent p-2 rounded-xl border border-[#393939] focus:ring-0 focus:outline-none"
              placeholder="Full Name"
              onChange={(e) => handleChange(e, 1)}
            />
          </div>
          <div className="input1 flex flex-col gap-3">
            <label htmlFor="">
              Enter your <span>Email Id</span>
            </label>
            <input
              type="text"
              className="bg-transparent p-2 rounded-xl border border-[#393939] focus:ring-0 focus:outline-none"
              placeholder="Email Id"
              onChange={(e) => handleChange(e, 2)}
            />
          </div>
          <div className="input1 flex flex-col gap-3">
            <label htmlFor="">
              Create a <span>Password</span>
            </label>
            <div className="input relative">
              <input
                type={inpType}
                className="bg-transparent w-full p-2 rounded-xl border border-[#393939] focus:ring-0 focus:outline-none"
                placeholder="Password"
                onChange={(e) => handleChange(e, 3)}
              />
              {inpType === "password" ? (
                <RemoveRedEyeIcon
                  className="text-green-500 absolute top-2 right-2"
                  fontSize={iconSize}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntType("text");
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  className="text-green-500 absolute top-2 right-2"
                  fontSize={iconSize}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntType("password");
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="button w-full flex items-center justify-center">
          <button
            className="button-var-1 hover:bg-[#09dd6d] hover:text-[#191919] transition-all ease-in duration-150 font-[400]"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
        </div>
        <div className="navigate flex flex-col gap-1 justify-center items-center">
          <h1 className="text-[0.75rem]">
            Already have an account?{" "}
            <span
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </span>{" "}
          </h1>
        </div>
      </div>
      <div className="absolute top-0">
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
};

export default Signup;

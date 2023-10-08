import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getBestSellingProd } from "../apis/api";
import demoimg from "../assets/demo-removebg-preview.png";
import { IRootState } from "../store/store";

const HeroProd = () => {
  const { bestSellingProduct } = useSelector(
    (state: IRootState) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBestProd = async () => {
      const res = await getBestSellingProd(dispatch);
      if (typeof res === "string") {
        toast.warn(res);
      }
    };
    fetchBestProd();
  }, []);
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center">
      <div className="wrapper w-[95%] min-h-[90vh] mt-[10vh] mx-auto flex flex-col items-center justify-between pt-5">
        <div className="top flex flex-col gap-5 md:gap-8 sm:w-[60%] xl:w-[40%]">
          <h1 className="text-[2.5rem] xl:text-[3.5rem] font-[600] text-center">
            {Object.keys(bestSellingProduct).length !== 0
              ? bestSellingProduct[0].title
              : "Getting Data..."}
          </h1>
          <h1 className="text-center text-[0.85rem] md:text-[1.2rem] xl:text-[1.2rem]">
            {Object.keys(bestSellingProduct).length !== 0
              ? bestSellingProduct[0].description
              : "Getting Data..."}
          </h1>
          <div className="links flex w-full items-center justify-evenly">
            <h1 className="text-[#09dd6d] text-[1.2rem] md:text-[1.5rem] xl:text-[1.3rem]  font-[500] cursor-pointer">
              Learn More {">"}
            </h1>
            <h1 className="text-[#09dd6d] text-[1.2rem] md:text-[1.5rem] xl:text-[1.3rem] font-[500] cursor-pointer">
              Buy {">"}
            </h1>
          </div>
        </div>
        <div className="bottom">
          <img
            src={bestSellingProduct && bestSellingProduct[0] && bestSellingProduct[0].thumbnail}
            alt=""
            sizes=""
            className="bg-[#191919]"
          />
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default HeroProd;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getBestSellingService } from "../apis/api";
import { IRootState } from "../store/store";
import { setIsLoading } from "../store/userSlice";
import Loader from "./Loader";

const HeroService = () => {
  const { bestSellingService } = useSelector(
    (state: IRootState) => state.service
  );
  const { isLoading } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBestProd = async () => {
      dispatch(setIsLoading(true));
      const res = await getBestSellingService(dispatch);
      if (typeof res === "string") {
        toast.warn(res);
      } else {
        dispatch(setIsLoading(false));
      }
    };
    fetchBestProd();
  }, []);
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper w-[95%] min-h-[90vh] mt-[10vh] mx-auto flex flex-col items-center justify-between pt-5">
          <div className="top flex flex-col gap-5 md:gap-8 sm:w-[60%] xl:w-[40%]">
            <h1 className="text-[2.5rem] xl:text-[3.5rem] font-[600] text-center text-[#191919]">
              {Object.keys(bestSellingService).length !== 0
                ? bestSellingService[0].title
                : "Getting Data..."}
            </h1>
            <h1 className="text-center text-[0.85rem] md:text-[1.2rem] xl:text-[1.2rem] text-[#191919]">
              {Object.keys(bestSellingService).length !== 0
                ? bestSellingService[0].description
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
              src={
                bestSellingService &&
                bestSellingService[0] &&
                bestSellingService[0].thumbnail
              }
              loading="lazy"
              alt=""
              sizes=""
              className="bg-[#191919]"
            />
          </div>
        </div>
      )}

      <ToastContainer theme="dark" />
      {/* <iframe
        className="w-full h-full"
        src="https://my.spline.design/iphone14procopy-d913a52c8fbbc39d79d45caab7ed9305/"
        width="100%"
        height="100%"
      ></iframe> */}
    </div>
  );
};

export default HeroService;

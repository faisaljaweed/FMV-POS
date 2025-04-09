import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<Rootstate>();

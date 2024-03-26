import React, { useEffect } from "react";
import s from "./Error.module.css";
import {
  setAppErrorPageAC,
  setAppStatusAC,
} from "../../app_and_store/AppReducer";
import { useAppDispatch, useAppSelector } from "../../app_and_store/Store";
import { Navigate } from "react-router-dom";
import img404 from "../../_assets/bgE.jpg";

export const Error404 = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const errorPage = useAppSelector((state) => state.app.errorPage);
  const timeout = useAppSelector((state) => state.app.timeout);

  dispatch(setAppStatusAC("failed"));
  useEffect(() => {
    setTimeout(() => {
      dispatch(setAppErrorPageAC(false));
    }, timeout);
  }, []);

  if (!errorPage && !isLoggedIn) {
    dispatch(setAppErrorPageAC(true));
    return <Navigate to="/login" />;
  } else if (!errorPage && isLoggedIn) {
    dispatch(setAppErrorPageAC(true));
    return <Navigate to="/todolists" />;
  }

  return (
    <div className={s.main}>
      <h2 className={s.text}>
        {`WAIT ${timeout / 1000} SECONDS OR CLICK BACK`}
      </h2>
      <img src={img404} alt="" />
    </div>
  );
};

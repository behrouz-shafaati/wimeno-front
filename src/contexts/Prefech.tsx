"use client";
import { ReactNode, useEffect } from "react";
import { store } from "../redux/store";
import { authApiSlice } from "../redux/api/authApiSlice";

type PrefechType = {
  children: ReactNode;
};

const Prefech = ({ children }: PrefechType) => {
  useEffect(() => {
    store.dispatch(authApiSlice.util.prefetch("refresh", {}, { force: true }));
  }, []);

  return <>{children}</>;
};

export default Prefech;

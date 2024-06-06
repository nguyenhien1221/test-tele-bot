import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import React from "react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx("flex justify-center items-center h-screen", className)}
    >
      <CircularProgress color="success" />
    </div>
  );
};

export default Loading;

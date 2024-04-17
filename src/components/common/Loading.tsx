import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loading;

import {
  CircularProgress,
  CircularProgressProps,
  circularProgressClasses,
} from "@mui/material";

export default function Progress(props: CircularProgressProps) {
  const mode = localStorage.getItem("mode");
  return (
    <div className="relative flex items-center">
      <CircularProgress
        variant="determinate"
        sx={{
          color: mode === "light" ? "#D9D9D9" : "#606060",
        }}
        size={16}
        thickness={6}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: mode === "light" ? "#000000" : "#fff",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={16}
        thickness={6}
        {...props}
      />
    </div>
  );
}

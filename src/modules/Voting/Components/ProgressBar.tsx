const ProgressBar = ({ completed }: { completed: any }) => {
  return (
    // <div className="h-[7px] w-full bg-[#F0F0F0]">
    //   <div
    //     className="h-full bg-[#AFE760] transition-all duration-150 ease-linear"
    //     style={{ width: `${completed}%` }}
    //   />
    // </div>
    <div className="loadingProgress">
      <span
        className="transition-all duration-1000 ease-linear"
        style={{ width: `${completed}%` }}
      ></span>
    </div>
  );
};

export default ProgressBar;

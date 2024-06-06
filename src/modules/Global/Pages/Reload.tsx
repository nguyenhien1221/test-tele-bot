import { Button } from "@mui/material";

const Reload = () => {
  console.debug('cache prune - 2');
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="bg-[#F2FFE0] h-screen  px-4 py-[120px]">
      <div className="flex flex-col h-full">
        <div
          className="flex-1 h-28 max-h-[223px] bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: `url("/images/overload.png?v=3")`,
          }}
        ></div>
        <div className="flex flex-col items-center pb-2">
          <div className="text-center mt-6 h-[120px]">
            <p className="text-[32px] font-extrabold">OOPS, SOMETHING WENT WRONG</p>
            <p>
              Please reload the page
            </p>
          </div>
        </div>
        <div className="pt-10">
          <Button
            onClick={handleReload}
            className="btn-hover fixed bottom-[55px] text-[20px] left-4 right-4 capitalize font-extrabold text-white py-[16px] rounded-xl bg-gradient-to-r from-[#97C35B] to-[#61A700] drop-shadow-[0_4px_0px_#4C7E0B]"
          >
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reload;
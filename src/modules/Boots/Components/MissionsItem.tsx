interface MissionsItemPropType {
  level: number;
}

const MissionsItem = ({ level }: MissionsItemPropType) => {
  return (
    <div>
      <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl p-4 w-full drop-shadow-lg">
        <div className="col-span-2 flex ">
          <img
            src={`/images/icons/storage${level}.svg`}
            width={60}
            alt="storage"
          ></img>
        </div>
        <div className="col-span-5">
          <p className="font-bold mb-2">{`Level ${level}`}</p>
          <div className="flex gap-[7px] mb-2">
            <p className="text-sm font-normal">Claim every 3h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionsItem;

import { create } from "zustand";

export const DUMMY_DATA = [
  // {
  //   index: 0,
  //   vote: 0,
  //   avatar: "/images/voting/1.png",
  //   name: "Grely",
  // },
  // {
  //   index: 1,
  //   vote: 0,
  //   avatar: "/images/voting/2.png",
  //   name: "Tomi",
  // },
  // {
  //   index: 2,
  //   vote: 0,
  //   avatar: "/images/voting/3.png",
  //   name: "Yanie",
  // },
  // {
  //   index: 3,
  //   vote: 0,
  //   avatar: "/images/voting/4.png",
  //   name: "Sunka",
  // },
  // {
  //   index: 4,
  //   vote: 0,
  //   avatar: "/images/voting/5.png",
  //   name: "Minoa",
  // },
];

export enum MODAL_TYPE {
  VOTE = "vote",
  REVOTE = "revote",
  BOOST = "boost",
}

export const useVoting = create((set) => ({
  isShowModal: false,
  isVoted: false,
  modalType: MODAL_TYPE.VOTE,
  name: "",
  chartData: DUMMY_DATA,
  modalImg: "",
  modalText: "",
  index: 0,
  isEnd: false,
  cm: {},
  votePower: 100,
  gameStarted: false,
  updateModal: (
    modalImg: string,
    modalText: string,
    modalType: string,
    index: number,
    name: string,
    cm: any
  ) =>
    set({
      modalImg: modalImg,
      modalText: modalText,
      isShowModal: true,
      modalType: modalType,
      index: index,
      name: name,
      cm: cm,
    }),
  result: "",
  setGameStart: (gameStarted: boolean) => set({ gameStarted: gameStarted }),
  setVotePower: (votePower: number) => set({ votePower: votePower }),
  setEnd: (isEnd: boolean) => set({ isEnd: isEnd }),
  setResult: (result: string) => set({ result: result }),
  updateVote: (isVoted: boolean) => set({ isVoted: isVoted }),
  updateChartData: (chartData: boolean) => set({ chartData: chartData }),
  showModal: (isShowModal: boolean) => set({ isShowModal: isShowModal }),
}));

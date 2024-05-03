/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef } from "react";

const Star = ({ number }: any) => {
  const starRef = useRef<any>();
  useEffect(() => {
    console.log(starRef);
    const staticPoistion = Math.floor(Math.random() * 2);
    const staticValue = Math.floor(Math.random() * 2);
    const flexValue = Math.floor(Math.random() * 101);
    const delay = Math.random() * 4;

    let dynamicStyles: any = null;

    const addAnimation = (body: string) => {
      if (!dynamicStyles) {
        dynamicStyles = document.createElement("style");
        dynamicStyles.type = "text/css";
        document.head.appendChild(dynamicStyles);
        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
      }
    };

    addAnimation(`
    @keyframes stars${number} {
        from {
          top: 50%;
          left: 50%;
          transform:scale(0.5);
        }
        to {
          top: ${
            staticPoistion === 0
              ? staticValue === 0
                ? "0%"
                : "100%"
              : `${flexValue}%`
          };
          left: ${
            staticPoistion === 1
              ? staticValue === 0
                ? "0%"
                : "100%"
              : `${flexValue}%`
          };
          transform:scale(1.5);
        }
      }
    `);

    starRef.current.style.animation = `stars${number} 4s linear infinite `;
    starRef.current.style.animationDelay = `${delay}s`;
  }, [starRef]);
  return <div ref={starRef} className="star1"></div>;
};

const Stars = () => {
  return (
    <>
      {[...Array(100)].map((item, index) => {
        return <Star key={index} number={index}></Star>;
      })}
    </>
  );
};

export default memo(Stars);

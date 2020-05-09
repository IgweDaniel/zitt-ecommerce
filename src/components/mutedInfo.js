import React from "react";

export const MutedInfo = ({ text }) => {
  return (
    <div>
      <>
        <h3 className="muted-info">{text}</h3>
        <style jsx>{`
          .muted-info {
            text-align: center;
            width: 100%;
            height: 40px;
            margin: 0px 0;
            font-family: "Catamaran";
            text-transform: capitalize;
            color: #888;
          }
        `}</style>
      </>
    </div>
  );
};

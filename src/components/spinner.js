import React from "react";

export const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <style jsx>
        {`
          .spinner {
            margin: 50px auto;
            width: 70px;
            text-align: center;
          }

          .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #333;

            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
          }

          .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }

          .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }

          @-webkit-keyframes sk-bouncedelay {
            0%,
            80%,
            100% {
              -webkit-transform: scale(0);
            }
            40% {
              -webkit-transform: scale(1);
            }
          }

          @keyframes sk-bouncedelay {
            0%,
            80%,
            100% {
              -webkit-transform: scale(0);
              transform: scale(0);
            }
            40% {
              -webkit-transform: scale(1);
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export const BounceSpinner = ({ size = 40 }) => {
  return (
    <>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <style jsx>{`
        .spinner {
          width: ${size}px;
          height: ${size}px;

          position: relative;
          margin: 100px auto;
        }

        .double-bounce1,
        .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #333;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;

          -webkit-animation: sk-bounce 2s infinite ease-in-out;
          animation: sk-bounce 2s infinite ease-in-out;
        }

        .double-bounce2 {
          -webkit-animation-delay: -1s;
          animation-delay: -1s;
        }

        @-webkit-keyframes sk-bounce {
          0%,
          100% {
            -webkit-transform: scale(0);
          }
          50% {
            -webkit-transform: scale(1);
          }
        }

        @keyframes sk-bounce {
          0%,
          100% {
            transform: scale(0);
            -webkit-transform: scale(0);
          }
          50% {
            transform: scale(1);
            -webkit-transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

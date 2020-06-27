import React, { useRef } from "react";
import { useUpdateEffect } from "../hooks";

export const Modal = ({
  children,
  closeModal,
  open = false,
  position = "left",
}) => {
  const modalRef = useRef(null);
  useUpdateEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      modalRef.current.classList.add("open");
      setTimeout(() => {
        modalRef.current.classList.add("animate");
      });
    } else {
      document.body.style.overflow = "auto";
      modalRef.current.classList.remove("animate");
      setTimeout(() => {
        modalRef.current.classList.remove("open");
      }, 300);
    }
  }, [open]);
  return (
    <>
      <div className={`modal`} ref={modalRef}>
        <div className="backdrop" onClick={closeModal}></div>
        <div className={`content ${position}`}>{children}</div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          z-index: 5;
          height: 100%;
          width: 100%;
          display: none;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
        }
        .modal.open {
          display: flex;
        }
        .backdrop {
          height: 100%;
          width: 100%;
          background-color: transparent;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 8;
        }

        .modal::after {
          position: fixed;
          top: 0;
          left: 0;
          opacity: 0;
          content: "";
          height: 100%;
          width: 100%;
          background-color: #000;
          z-index: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .modal .content {
          position: fixed;
          top: 0;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 28;
          transition: all 0.3s ease-in-out 0.2s;
          overflow: auto;
        }

        .content.right,
        .content.left {
          width: 90%;
          max-width: 400px;
          background-color: #fff;
          border: 0.5px solid #eee;
        }
        .modal.animate .content.right,
        .modal.animate .content.left {
          transform: translateX(0);
        }
        .content.left {
          left: 0;
          transform: translateX(-100%);
        }
        .content.right {
          right: 0;
          transform: translateX(100%);
        }

        .modal.animate .content {
          transition: all 0.3s ease-in-out 0.2s;
        }

        .modal.animate::after {
          opacity: 0.5;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

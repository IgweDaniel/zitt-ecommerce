import React, { useEffect, useRef } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useUpdateEffect } from "../hooks";

const ProductCarousel = ({ children, renderThumbs, deps = [] }) => {
  let slider = null,
    thumbs = null,
    allowShiftRef = useRef(true),
    index = 1,
    itemWidthRef = useRef(0);

  function checkIndex() {
    const Lenght = children.length;
    slider.classList.remove("shifting");
    if (index == 0) {
      slider.style.left = `-${Lenght * itemWidthRef.current}px`;

      index = Lenght;
    } else if (index == Lenght + 1) {
      slider.style.left = `-${itemWidthRef.current}px`;
      index = 1;
    }
    if (renderThumbs) {
      resetThumbs();
      thumbs.children[index - 1].classList.add("current");
    }
    allowShiftRef.current = true;
  }

  function setIndex(i) {
    if (allowShiftRef.current) {
      slider.classList.add("shifting");
      index = i;
      slider.style.left = `-${itemWidthRef.current * index}px`;
    }
    allowShiftRef.current = false;
  }
  function shiftSlide(dir, action) {
    slider.classList.add("shifting");
    if (allowShiftRef.current) {
      if (dir == 1) {
        index += 1;
        slider.style.left = `-${itemWidthRef.current * index}px`;
      } else if (dir == -1) {
        index -= 1;
        slider.style.left = `-${itemWidthRef.current * index}px`;
      }
    }
    allowShiftRef.current = false;
  }
  function resetThumbs() {
    Array.from(thumbs.children).forEach((element) => {
      element.classList.remove("current");
    });
  }
  function resetDom() {
    if (renderThumbs) {
      resetThumbs();
    }
    Array.from(slider.querySelectorAll(".clone")).forEach((el) => {
      slider.removeChild(el);
    });
  }
  useEffect(() => {
    resetDom();

    const { width } = slider.firstElementChild.getBoundingClientRect();
    itemWidthRef.current = width;
    const cloneFirst = slider.firstElementChild.cloneNode(true),
      cloneLast = slider.lastElementChild.cloneNode(true);
    cloneFirst.classList.add("clone");
    cloneLast.classList.add("clone");
    slider.appendChild(cloneFirst);
    slider.prepend(cloneLast);
    slider.style.left = `-${itemWidthRef.current}px`;

    if (renderThumbs) thumbs.children[index - 1].classList.add("current");
  }, [...deps]);

  return (
    <>
      <div className="carousel-outer">
        <div className="carousel">
          <div className="controls">
            <span className="prev arrow" onClick={() => shiftSlide(-1)}>
              <IoIosArrowBack size={25} color="#888" />
            </span>
            <span className="next arrow" onClick={() => shiftSlide(1)}>
              <IoIosArrowForward color="#888" size={25} />
            </span>
          </div>

          <section
            onTransitionEnd={checkIndex}
            className="slider"
            ref={(el) => (slider = el)}
          >
            {children &&
              children.map((child, i) => (
                <div style={{ width: "100%", flexShrink: 0 }} key={i}>
                  {child}
                </div>
              ))}
          </section>
        </div>
        {renderThumbs && (
          <div className="thumbs" ref={(el) => (thumbs = el)}>
            {children.map((child, i) => (
              <div
                className="thumbnail"
                key={i}
                onClick={() => setIndex(i + 1)}
              >
                {child}
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .carousel-outer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        }

        .carousel {
          position: relative;
          width: 100%;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .controls {
          width: 100%;
          cursor: pointer;
          z-index: 2;
        }
        .controls .button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          background: #fff;
          cursor: pointer;
          margin: 10px;
          text-align: center;
          padding: 0;
        }
        .button:active {
          background: red;
        }
        .prev {
          left: 0;
        }
        .next {
          right: 0;
        }
        .shifting {
          transition: left 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .slider {
          height: 100%;
          display: flex;
          position: relative;
          border: 1px solid rebeccapurple;
        }
        .slider > img {
          flex-shrink: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .thumbs {
          width: 130px;
          height: 100%;
          margin-right: 10px;
          overflow: hidden;
        }
        .thumbs .thumbnail {
          height: 100px;
          width: 100%;
          margin: 0 0 5px;
          cursor: pointer;
        }
        .thumbs .thumbnail:hover {
          opacity: 0.4;
          transition: all 0.2s ease-in-out;
        }
        .thumbs .thumbnail img {
          width: 100px !important;
          height: 100px !important;
          object-fit: cover;
          object-position: center;
        }
        .current {
          opacity: 0.4;
          transition: all 0.2s ease-in-out;
        }
        .arrow {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: absolute;
          top: 50%;
          transform: tranlateY(-50%);
          z-index: 1;
          background-color: #fff;
          height: 40px;
          width: 40px;
          box-shadow: 3px 6px 14px -3px rgba(0, 0, 0, 0.75);
        }
        .arrow.prev {
          left: 0;
        }
        .arrow.next {
          right: 0;
        }
      `}</style>
    </>
  );
};

export default ProductCarousel;

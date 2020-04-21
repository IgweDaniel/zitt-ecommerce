import React, { Fragment, useEffect, useState, useRef } from "react";

export const Carousel = ({ children }) => {
  const sliderRef = useRef(null),
    allowShift = useRef(true),
    index = useRef(1),
    itemWidth = useRef(0);

  let items = children.filter((child) => child.type == CarouselItem);

  useEffect(() => {
    const { current: slider } = sliderRef;
    const cloneFirst = slider.firstElementChild.cloneNode(true),
      cloneLast = slider.lastElementChild.cloneNode(true);

    slider.appendChild(cloneFirst);
    slider.prepend(cloneLast);

    const { width } = document
      .querySelector(".carousel .items")
      .getBoundingClientRect();

    itemWidth.current = width;

    slider.addEventListener("transitionend", checkIndex);
    return () => {
      slider.removeEventListener("transitionend", checkIndex);
    };
  }, []);

  function checkIndex() {
    const { current: slider } = sliderRef;
    slider.classList.remove("shifting");

    if (index.current == 0) {
      slider.style.transform = `translateX(-${
        items.length * itemWidth.current
      }px)`;
      index.current = items.length;
    } else if (index.current == items.length + 1) {
      slider.style.transform = `translateX(-${itemWidth.current}px)`;
      index.current = 1;
    }

    allowShift.current = true;
  }

  function shiftSlide(dir, action) {
    const { current: slider } = sliderRef;
    slider.classList.add("shifting");

    if (allowShift.current) {
      if (dir == 1) {
        index.current += 1;
        slider.style.transform = `translateX(-${
          index.current * itemWidth.current
        }px)`;
      } else if (dir == -1) {
        index.current -= 1;
        slider.style.transform = `translateX(-${
          index.current * itemWidth.current
        }px)`;
      }
    }
    allowShift.current = false;
  }

  return (
    <>
      <div className="carousel">
        <div className="controls">
          <span className="prev button" onClick={() => shiftSlide(-1)}>
            prev
          </span>
          <span className="next button" onClick={() => shiftSlide(1)}>
            next
          </span>
        </div>
        <div className="slider" ref={sliderRef}>
          {items.map((child, i) => (
            <Fragment key={i}>{child} </Fragment>
          ))}
        </div>
      </div>
      <style jsx>{`
        .controls {
          position: absolute;
          top: 0;
          cursor: pointer;
          z-index: 2;
        }
        .button {
          background: #fff;
          cursor: pointer;

          margin: 10px;
          padding: 1rem;
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
          transition: transform 0.3s ease-out;
        }

        .carousel {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .slider {
          height: 100%;
          display: flex;
          position: relative;
          flex-shrink: 0;
          width: 100%;
          transform: translateX(-${itemWidth.current}px);
        }
      `}</style>
    </>
  );
};

export const CarouselItem = ({ children }) => {
  return (
    <>
      <div className="items">{children}</div>
      <style jsx>{`
        .items {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          flex-shrink: 0;
          min-width: 100%;

          height: 100%;
        }
      `}</style>
    </>
  );
};

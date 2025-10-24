import PointerTracker from "pointer-tracker";
import { SIZE } from "./main";
import type { Pointer } from "pointer-tracker/dist/index.js";

const MOVE_LIMIT = 20;
const BUTTON_SIZE = 70;

function handlePinchZoom({
  element,
  previousPointers,
  changedPointers,
  screenWidth,
  screenHeight
}: {
  element: HTMLBaseElement,
  previousPointers: Pointer[]
  changedPointers: Pointer[],
  screenWidth: number,
  screenHeight: number
}) {
  const width = element.offsetWidth;
  const {
    clientX: x1,
    clientY: y1
  } = previousPointers[0];
  const {
    clientX: x2,
    clientY: y2
  } = previousPointers[1];
  const {
    clientX: xc1,
    clientY: yc1
  } = changedPointers[0];
  const {
    clientX: xc2,
    clientY: yc2
  } = changedPointers[1];

  const boundary = element.getBoundingClientRect();
  // Calculate distances
  const distance1 = (x1 - x2) ** 2 + (y1 - y2) ** 2
  const distance2 = (xc1 - xc2) ** 2 + (yc1 - yc2) ** 2

  if (width > 20 && distance1 > distance2) {
    element.style.width = `${element.offsetWidth - 2}px`;
    element.style.height = `${element.offsetHeight - 2}px`;
  } else {
    if (width < SIZE * 4 && boundary.right < screenWidth - MOVE_LIMIT && boundary.bottom < screenHeight - BUTTON_SIZE) {
      element.style.width = `${element.offsetWidth + 2}px`;
      element.style.height = `${element.offsetHeight + 2}px`;
    }
  }
}

function handleMove({
  element,
  changedPointers,
  screenWidth,
  screenHeight,
}: {
  element: HTMLBaseElement,
  changedPointers: Pointer[],
  screenWidth: number,
  screenHeight: number
}) {

  const {
    clientX: x,
    clientY: y
  } = changedPointers[0];
  if (x > MOVE_LIMIT && x < screenWidth - (SIZE + MOVE_LIMIT)) {
    element.style.left = `${x}px`;
  }
  if (y > MOVE_LIMIT + 10 && y < screenHeight - (SIZE + BUTTON_SIZE)) {
    element.style.top = `${y}px`;
  }
}

export function setupCounter(element: HTMLBaseElement) {
  const pointerTracker = new PointerTracker(element, {
    start(pointer, event) {
      element.classList.add("selected");
      const rect = element.getBoundingClientRect();
      element.style.left = `${rect.x}px`;
      element.style.top = `${rect.y}px`;
      element.style.position = `absolute`;
      return true;
    },
    move(previousPointers, changedPointers, event) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      if (previousPointers.length > 1) {
        handlePinchZoom({
          element,
          previousPointers,
          changedPointers: pointerTracker.currentPointers,
          screenWidth,
          screenHeight
        })
      } else {
        handleMove({ element, changedPointers, screenWidth, screenHeight })
      }
    },
    end() {
      element.className = "";
    },
    avoidPointerEvents: true
  })
}

export function handleReset(element: HTMLButtonElement) {
  const actor = document.querySelector<HTMLButtonElement>('#actor')!
  element.onclick = (event) => {
    actor.removeAttribute("style")
  }
}

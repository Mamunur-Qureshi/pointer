import PointerTracker from "pointer-tracker";
import { SIZE } from "./main";

const MOVE_LIMIT = 20;
const BUTTON_SIZE = 90;

export function setupCounter(element: HTMLButtonElement) {
  const pointerTracker = new PointerTracker(element, {
    start(pointer, event) {
      element.classList.add("selected");
      const rect = element.getBoundingClientRect();
      element.style.left = `${rect.x}px`;
      element.style.top = `${rect.y}px`;
      return true;
    },
    move(previousPointers, changedPointers, event) {
      console.log(previousPointers, changedPointers);
      // const {
      //   clientX: x,
      //   clientY: y
      // } = changedPointers[0];
      // const screenWidth = window.innerWidth;
      // const screenHeight = window.innerHeight;
      // if (x > MOVE_LIMIT && x < screenWidth - (SIZE + MOVE_LIMIT)) {
      //   element.style.left = `${x}px`;
      // }
      //
      // if (y > MOVE_LIMIT && y < screenHeight - (SIZE + BUTTON_SIZE)) {
      //   element.style.top = `${y}px`;
      // }
    },
    end() {
      element.className = "";
    }
  })
}

export function handleReset(element: HTMLButtonElement) {
  const actor = document.querySelector<HTMLButtonElement>('#actor')!
  element.onclick = (event) => {
    actor.removeAttribute("style")
  }
}

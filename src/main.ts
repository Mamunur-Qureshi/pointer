import './style.css'

import { handleReset, setupCounter } from './pointer.ts'

export const SIZE = 75;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="main">
    <div class="wrapper">
      <div id="actor" style=></div>
    </div>
    <button id="reset">Reset</button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#actor')!)
handleReset(document.querySelector<HTMLButtonElement>('#reset')!)

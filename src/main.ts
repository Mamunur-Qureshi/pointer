import './style.css'

import { handleReset, setupCounter } from './counter.ts'

export const SIZE = 100;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="main">
    <div id="actor" style=></div>
    <button id="reset">Reset</button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#actor')!)
handleReset(document.querySelector<HTMLButtonElement>('#reset')!)

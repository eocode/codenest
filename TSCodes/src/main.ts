import './style.css'
import {name} from './basic/types';
import {pokemonIds, bulbasaur, pokemons} from './basic/objects';
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'
import { charmander } from './basic/injection'
import { charmander2 } from './basic/decorators2'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <p>${name}</p>
    <p>${pokemonIds}</p>
    <p>${bulbasaur.name}</p>
    <p>${pokemons}</p>
    <p>${charmander.name}</p>
    <p>${charmander2.name}</p>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

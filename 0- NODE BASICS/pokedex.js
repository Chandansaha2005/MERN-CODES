let pokeinfo = require("./Pokemons")
let print = console.log

print(pokeinfo) /*[
  { name: 'PIKACHU', type: 'ELECTRIC', power: '70' },
  { name: 'CHARIZARD', type: 'FIRE', power: '40' },
  { name: 'ONEX', type: 'ROCK', power: '65' }
]
*/


print(pokeinfo[0]) //{ name: 'PIKACHU', type: 'ELECTRIC', power: '70' }

print(pokeinfo[1].type)//FIRE
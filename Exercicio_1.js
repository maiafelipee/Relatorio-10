class Pokemon {
    #vida;

    constructor(apelido, tipo, vidaInicial) {
        this.apelido = apelido;
        this.tipo = tipo;
        this.#vida = vidaInicial;
    }

    get vida() {
        return this.#vida;
    }

    sofrerDano(pontos) {
        this.#vida -= pontos;

        if (this.#vida < 0) {
            this.#vida = 0;
        }

        console.log(`${this.apelido} sofreu dano! Vida restante: ${this.#vida}`);
    }

    atacar(alvo) {
        console.log(`${this.apelido} atacou ${alvo.apelido}!`);
        alvo.sofrerDano(10);
    }
}

// HERANÇA
class Squirtle extends Pokemon {
    constructor(apelido, vidaInicial) {
        super(apelido, 'Água', vidaInicial);
    }

    atacar(alvo) {
        console.log(`${this.apelido} usou Jato de Água contra ${alvo.apelido}!`);
        alvo.sofrerDano(20);
    }
}

class Bulbasaur extends Pokemon {
    constructor(apelido, vidaInicial) {
        super(apelido, 'Planta', vidaInicial);
    }

    atacar(alvo) {
        console.log(`${this.apelido} usou Chicote de Vinha contra ${alvo.apelido}!`);
        alvo.sofrerDano(15);
    }
}


// MAIN

let apelidoSquirtle = prompt("Digite o apelido do Squirtle:");
let vidaSquirtle = Number(prompt("Digite a vida inicial do Squirtle:"));

let apelidoBulbasaur = prompt("Digite o apelido do Bulbasaur:");

// CRIACAO DOS POKEMONS
const squirtle = new Squirtle(apelidoSquirtle, vidaSquirtle);
const bulbasaur = new Bulbasaur(apelidoBulbasaur, 30);

// BATALHA
console.log("\n--- INICIO DA BATALHA ---");

bulbasaur.atacar(squirtle);

squirtle.atacar(bulbasaur);
squirtle.atacar(bulbasaur);

console.log("\n--- RESULTADO FINAL ---");

console.log(`${squirtle.apelido}: ${squirtle.vida} de vida`);
console.log(`${bulbasaur.apelido}: ${bulbasaur.vida} de vida`);

// teste
// console.log(squirtle.#vida);
// a linha acima gera erro porque #vida é privado

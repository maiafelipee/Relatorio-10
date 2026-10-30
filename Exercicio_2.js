const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(mensagem) {
    return new Promise(resolve => {
        rl.question(mensagem, resposta => {
            resolve(resposta);
        });
    });
}

class Pistola {
    constructor(modelo) {
        this.modelo = modelo;
    }
}

class AgenteProtocolo {
    #pistola;

    constructor(codinome, modeloDaPistola) {
        this.codinome = codinome;

        this.#pistola = new Pistola(modeloDaPistola);
    }

    usarHabilidade() {
        throw new Error("O agente deve implementar usarHabilidade()");
    }

    entrarEmCombate() {
        console.log(`\nAgente: ${this.codinome}`);
        console.log(`Pistola: ${this.#pistola.modelo}`);
        console.log(`Habilidade: ${this.usarHabilidade()}`);
    }
}

class Controlador extends AgenteProtocolo {
    usarHabilidade() {
        return "Utiliza fumaça para bloquear a visão dos inimigos.";
    }
}

class Iniciador extends AgenteProtocolo {
    usarHabilidade() {
        return "Utiliza habilidades para revelar e desorientar inimigos.";
    }
}

class Duelista extends AgenteProtocolo {
    usarHabilidade() {
        return "Utiliza habilidades agressivas para eliminar adversários.";
    }
}

class Esquadrao {
    #agentes;

    constructor(nome, agentes) {
        this.nome = nome;
        this.#agentes = agentes;
    }

    iniciarPartida() {
        console.log(`\n===== ESQUADRÃO ${this.nome} =====`);

        this.#agentes.forEach(a => {
            a.entrarEmCombate();
        });
    }

    listarControladores() {

        return this.#agentes.filter(a => a instanceof Controlador);
    }
}


// MAIN



async function main() {

    let nomeEsquadrao = await perguntar("Digite o nome do esquadrão: ");

    let nomeControlador1 = await perguntar("Digite o codinome do primeiro Controlador: ");
    let pistolaControlador1 = await perguntar("Digite o modelo da pistola: ");

    let nomeControlador2 = await perguntar("Digite o codinome do segundo Controlador: ");
    let pistolaControlador2 = await perguntar("Digite o modelo da pistola: ");

    let nomeIniciador = await perguntar("Digite o codinome do Iniciador: ");
    let pistolaIniciador = await perguntar("Digite o modelo da pistola: ");

    let nomeDuelista = await perguntar("Digite o codinome do Duelista: ");
    let pistolaDuelista = await perguntar("Digite o modelo da pistola: ");

    const controlador1 = new Controlador(nomeControlador1, pistolaControlador1);
    const controlador2 = new Controlador(nomeControlador2, pistolaControlador2);
    const iniciador = new Iniciador(nomeIniciador, pistolaIniciador);
    const duelista = new Duelista(nomeDuelista, pistolaDuelista);

    const esquadrao = new Esquadrao(nomeEsquadrao, [
        controlador1,
        controlador2,
        iniciador,
        duelista
    ]);

    // inicia partida
    esquadrao.iniciarPartida();

    // listra dos controladors
    console.log("\n--- CONTROLADORES DO ESQUADRAO ---");

    esquadrao.listarControladores().forEach(a => {
        console.log(a.codinome);
    });

    // TESTE DO CONTRATO
    const agenteTeste = new AgenteProtocolo("Teste", "Classic");

    // agenteTeste.entrarEmCombate();
    // a chamada gera erro porque usarHabilidade() nao foi sobrescrito.
}

// executa main
main().finally(() => rl.close());

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const animaisValidos = {
            "LEAO": { tamanho: 3, bioma: "savana" },
            "LEOPARDO": { tamanho: 2, bioma: "savana" },
            "CROCODILO": { tamanho: 3, bioma: "rio" },
            "MACACO": { tamanho: 1, bioma: ["savana", "floresta"] },
            "GAZELA": { tamanho: 2, bioma: "savana" },
            "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"] }
        };

        const recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisPresentes: 3 },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisPresentes: 0 },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisPresentes: 1 },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisPresentes: 0 },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisPresentes: 1 }
        ];

        // Verifica se o animal informado é válido
        if (!animaisValidos[animal]) {
            return { erro: "Animal inválido" };
        }

        // Verifica se a quantidade é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = animaisValidos[animal];
        const biomaAnimal = infoAnimal.bioma;
        let recintosViaveis = [];

        // Percorre os recintos disponíveis
        for (let recinto of recintos) {
            // Calcula o espaço ocupado pelos novos animais
            const espaçoOcupado = quantidade * infoAnimal.tamanho;

            // Adiciona 1 espaço extra se já houver animais presentes
            const espaçoExtra = recinto.animaisPresentes > 0 ? 1 : 0;

            // Agora calculamos o espaço livre corretamente
            const espaçoLivre = recinto.tamanhoTotal - (recinto.animaisPresentes + espaçoOcupado + espaçoExtra);

            // Verifica se o bioma do animal é permitido
            const biomasPermitidos = Array.isArray(biomaAnimal) ? biomaAnimal : [biomaAnimal];
            if (
                espaçoLivre >= 0 && // Verifica se há espaço suficiente
                biomasPermitidos.some(bioma => recinto.bioma.includes(bioma)) && // Verifica se o bioma é permitido
                (recinto.animaisPresentes === 0 || (recinto.animaisPresentes > 0 && infoAnimal.bioma.includes(recinto.bioma)))
            ) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };

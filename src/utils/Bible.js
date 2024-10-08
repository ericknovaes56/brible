export default class Bible {

    static async getRandomPsalm() {
        // Número de capítulos em Salmos
        const totalCapitulos = 150;

        // Escolhe um capítulo aleatório entre 1 e 150
        const capitulo = Math.floor(Math.random() * totalCapitulos) + 1;

        // Número aproximado de versículos em cada capítulo de Salmos (pode variar dependendo da tradução)
        const maxVersiculos = [
            6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12,
            24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12,
            8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17,
            16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8,
            9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6
        ];

        // Escolhe um versículo aleatório dentro do capítulo selecionado
        const versiculo = Math.floor(Math.random() * maxVersiculos[capitulo - 1]) + 1;

        // Faz a requisição para a API de Salmos
        const response = await fetch(`https://bible-api.com/Salmos%20${capitulo}:${versiculo}?translation=almeida`);
        const data = await response.json();

        return data;
    }

    static async read(livro){

        try {
            
            const response = await fetch(`https://bible-api.com/${livro}?translation=almeida`);

            const data = await response.json();

            return data

        } catch (error) {
            return error
        }

    }

    static async ouvir(text) {

        

        const textToSpeech = speechSynthesis,
            ttsText = new SpeechSynthesisUtterance(text)


        if (text === false){
            textToSpeech.cancel()
            return
        }

        ttsText.lang = "pt-br"
        ttsText.voice = textToSpeech.getVoices().filter((voice) => {

            return voice.lang == "pt-br" && voice.name.includes('(Natural)')

        })[0]

        textToSpeech.cancel()
        textToSpeech.speak(ttsText)



    }
}
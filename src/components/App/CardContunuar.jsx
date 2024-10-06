import { useEffect, useState } from "react";

export default function CardContinuar({ save, index }) {
    const [nameBtn, setNameBtn] = useState();
    const [cap, setCap] = useState(1)

    useEffect(() => {
        const local = [];

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            const valor = localStorage.getItem(chave);

            local.push({
                chave: chave,
                valor: valor
            });
        }

        const verses = [];

        local.forEach(isVerse => {
            const splited = isVerse.chave.split("-");
            if (splited.includes("VERSE")) {
                if (splited[2] === save.key.replace("-SAVE", "")) {
                    verses.push({
                        chave: isVerse.chave,
                        valor: isVerse.valor
                    });
                }
            }
        });

        function encontrarMaiorCapituloVersiculo(arr) {
            let maior = null; 

            arr.forEach(obj => {
                const partes = obj.chave.split('-');
                
        
                const capitulo = parseInt(partes[0]); 
                const versiculo = parseInt(partes[1]);

  
                if (maior === null || 
                   (capitulo > parseInt(maior.chave.split('-')[0]) || 
                   (capitulo === parseInt(maior.chave.split('-')[0]) && versiculo > parseInt(maior.chave.split('-')[1])))) {
                    maior = obj; // Atualiza maior
                }
            });

            // Define o valor do botão como o maior encontrado ou o valor padrão
            if (maior) {
                const maiorsplit = maior.chave.split("-")
                setCap(maiorsplit[0])
                setNameBtn(maior.chave);
            } else {
                setNameBtn(save.key.replace("-SAVE", ""));
            }
        }

        encontrarMaiorCapituloVersiculo(verses);

    }, [save.key]);

    return (
        <span key={index} className="p-3 flex-none flex gap-3 flex-col min-h-[180px] w-[300px] overflow-hidden bg-[#39393d6e] rounded-md">
            <span className="bg-[#131314] h-[40px] w-[40px] justify-center rounded-md items-center flex ">
                <i className='bx bxs-book-bookmark text-white'></i>
            </span>
            <p className="border-l-2 text-white text-[27px] border-[#131314] pl-2">
                {save.key.replace("-SAVE", "")}
            </p>
            <p className="pr-2 text-white scroll max-h-[100px] overflow-y-auto border-[#131314] pl-2">
                {save.text}
            </p>
            <div className="flex gap-2 ">
                <a href={"/livro/" + save.key.replace("-SAVE", "") + "/" + cap} className="w-full">
                    <button className="bg-[#131314] text-white w-full capitalize btn p-2 rounded-md">
                        {nameBtn}
                    </button>
                </a>
            </div>
        </span>
    );
}

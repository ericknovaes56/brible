import { useEffect, useState, useRef } from "react";
import CardContinuar from "./CardContunuar";

export default function ContinuarLendo() {
    const [saves, setSaves] = useState([]);
    const scrollRef = useRef(null); // Referência para o contêiner dos cartões

    const livros = [
        "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
        "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
        "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
        "Neemias", "Ester", "Jó", "Salmos", "Provérbios",
        "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações",
        "Ezequiel", "Daniel", "Oséias", "Joel", "Amós",
        "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque",
        "Sofonias", "Ageu", "Zacarias", "Malaquias",
        "Mateus", "Marcos", "Lucas", "João", "Atos",
        "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios",
        "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses",
        "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus",
        "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João",
        "3 João", "Judas", "Apocalipse"
    ];

    useEffect(() => {
        const call = () => {
            const savedItems = [];

            livros.forEach(livro => {
                const consult = localStorage.getItem(livro + "-SAVE");

                if (consult) {
                    savedItems.push({
                        key: livro + "-SAVE",
                        text: consult
                    });
                }
            });
            setSaves(savedItems);
        };

        call();
    }, []);

    // Função para scrollar para a direita
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' }); // 200px para a direita
        }
    };

    // Função para scrollar para a esquerda
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' }); // 200px para a esquerda
        }
    };

    return (
        <>
            {saves.length !== 0 ? <span className="text-white mt-4 flex">#Continuar</span> : null}
            <div className="flex scroll-none overflow-x-auto mt-4 gap-2" ref={scrollRef}>
                {saves.reverse().map((save, index) => (
                    <CardContinuar save={save} index={index} key={save.key} />
                ))}
            </div>
            {saves.length !== 0 ? (
                <div className="mt-4 sumir gap-2 flex">
                    <button 
                        className="back-color flex justify-center items-center h-[52px] text-white rounded-full w-[52px]"
                        onClick={scrollLeft} // Chama a função de scroll para a esquerda
                    >
                        <i className='bx text-[30px] bx-chevron-left'></i>
                    </button>
                    <button 
                        className="back-color flex justify-center items-center h-[52px] text-white rounded-full w-[52px]"
                        onClick={scrollRight} // Chama a função de scroll para a direita
                    >
                        <i className='bx text-[30px] bx-chevron-right'></i>
                    </button>
                </div>
            ) : null}
        </>
    );
}

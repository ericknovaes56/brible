export default function Livros() {
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

    return (
        <div className="text-white grid grid-cols-5 gridapp gap-2 flex-wrap mt-3">
            {livros.map((livro, index) => (
                <span key={index} className="p-3 flex gap-3 flex-col min-h-[180px] bg-[#39393d6e] rounded-md">

                    <span className="bg-[#131314] h-[40px] w-[40px] justify-center rounded-md items-center flex ">
                        <i className='bx bxs-book-bookmark'></i>
                    </span>
                    <span className="border-l-2 border-[#131314] pl-2 whitespace-nowrap text-[27px]">
                        {livro}
                    </span>
                    <div className="flex gap-2 ">
                        <a href={"/livro/"+livro} className="w-full" >
                            <button className="bg-[#131314] w-full capitalize btn p-2 rounded-md">
                                Iniciar
                            </button>
                        </a>
                    </div>
                </span>
            ))}
        </div>
    );
}

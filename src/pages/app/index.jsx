import { useEffect, useState } from "react";
import { Load } from "../../components/Load";
import NavBar from "../../components/NavBar";
import Bible from "../../utils/Bible.js";
import Livros from "../../components/Livros";

export default function App() {

    const [gospel, setGospel] = useState()


    useEffect(() => {

        const call = async () => {
            const response = await Bible.getRandomPsalm()

            setGospel(response)

        }
        call()

    }, []);

    return (
        <main>  
 
            <div className="boll"></div>
            <div className="content pt-10 z-10">
                <div className="content-max">
                    <div className="flex topoapp gap-2">

                        <div className="text-white flex-1 bg-[#0000009d] w-fit rounded-xl gap-3 flex flex-col p-4">

                            <span className="mt-2 text-[10px] flex bg-[#131314] w-fit p-1 rounded-md">
                                #Começar
                            </span>
                            <div className="flex  gap-2 items-center">

                                <span className="bg-[#131314] h-[40px] w-[40px] justify-center rounded-md items-center flex ">
                                    <i class='bx bxs-star'></i>
                                </span>
                                Vamos começar a ler ?

                            </div>
                            <p className="flex flex-col">
                                Ler a Bíblia é uma oportunidade de encontrar paz, sabedoria e direção em meio às incertezas da vida. Cada versículo pode trazer consolo e inspiração, ajudando a fortalecer a fé e a conexão com Deus.
                            </p>
                            <div className="flex gap-2">
                                <span className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    Começar
                                </span>
                            </div>
                        </div>
                        <div className="text-white flex-1 backimage back-color rounded-xl gap-3 flex flex-col p-4">

                            <span className="mt-2 text-[10px] flex bg-[#131314] w-fit p-1 rounded-md">
                                {gospel ? gospel.reference : "Carregando..."}
                            </span>
                            <div className="flex  gap-2 items-center">

                                <span className="bg-[#131314] h-[40px] w-[40px] justify-center rounded-md items-center flex ">
                                    <i className='bx bxs-book-bookmark'></i>
                                </span>
                                Salmos

                            </div>
                            <p className="flex flex-col">
                                {gospel ? gospel.text : <Load />}
                            </p>
                            <div className="flex wrap-cont gap-2">
                                <span onClick={() => {
                                    if (Bible) {
                                        Bible.ouvir(gospel.text)
                                    }
                                }} className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    <i className='bx bx-play' ></i>
                                    Ouvir
                                </span>
                                <span className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    <i className='bx bx-bookmark'></i>
                                    Salvar
                                </span>
                                <span className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    <i className='bx bx-question-mark' ></i>
                                    Me explique !
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="text-white mt-4 flex">#Livros</span>
                    <Livros/>
                </div>
            </div>
        </main>
    )
}
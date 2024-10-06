import { useEffect, useState } from "react";
import { Load } from "../../components/Load";
import NavBar from "../../components/NavBar";
import Bible from "../../utils/Bible.js";
import Livros from "../../components/Livros";
import ContinuarLendo from "../../components/App/ContinuarLendo.jsx";
import Salmos from "../../components/App/Salmos.jsx";

export default function App() {

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
                                <a href="/livro/Gênesis" className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    Começar
                                </a>
                            </div>
                        </div>
                        <Salmos/>
                    </div>
                    <ContinuarLendo/>

                    <span className="text-white mt-4 flex">#Livros</span>
                    <Livros/>
                </div>
            </div>
        </main>
    )
}
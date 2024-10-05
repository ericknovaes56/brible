import { useEffect, useState } from "react";
import { Load } from "../../components/Load";
import NavBar from "../../components/NavBar";
import Bible from "../../utils/bible.js";
import Livros from "../../components/Livros";
import { json, useNavigate, useParams } from "react-router-dom";
import requestAi from "../../utils/gemini.js";

export default function Livro() {

    const { livro } = useParams()
    const [context, setContext] = useState("")
    const [livroApi, setlivroApi] = useState("")
    const [number, setNumber] = useState(1)

    const navigate = useNavigate()

    const call = async () => {

        const livroApi = await Bible.read(livro + "+" + number)

        if (!livroApi.error) {
            setlivroApi(livroApi)
        } else {
            navigate("/")
        }


        if (!livro) return

        if (localStorage.getItem(livro)) {

            const data = JSON.parse(localStorage.getItem(livro))

            setContext(data)
            return
        }

        const response = await requestAi("explique sobre esse livro da biblia de forma breve e resumida 4 linhas: " + livroApi.reference)


        if (response.code == 200) {
            setContext(response.data)
            localStorage.setItem(livro, JSON.stringify(response.data))
        }



    }

    useEffect(() => {


        call()

    }, []);

    useEffect(() => {


        call()

    }, [number]);

    const heandleProximo = () =>{
        setlivroApi(null)
        setNumber(prevNumber => prevNumber + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    return (
        <main>

            <div className="boll"></div>
            <div className="content pt-10 z-10">
                <div className="content-max">
                    <a href="/">

                        <button className="btn text-white mb-4 back-color p-2 rounded-lg">
                            <i class='bx bx-home-alt-2'></i>
                            VOLTAR
                        </button>

                    </a>
                    <div className="flex gap-2">

                        <div className="text-white flex-1 backimage back-color w-fit rounded-xl gap-3 flex flex-col p-4">

                            <span className="mt-2 text-[10px] flex bg-[#131314] w-fit p-1 rounded-md">
                                Livro
                            </span>
                            <div className="flex  gap-2 items-center">

                                <span className="bg-[#131314] h-[40px] w-[40px] justify-center rounded-md items-center flex ">
                                    <i className='bx bxs-book-bookmark'></i>
                                </span>
                                {livroApi ? livroApi.reference : "..."}

                            </div>
                            <p className="flex flex-col">
                                {context ? context.text : <Load />}
                            </p>
                            <div className="flex gap-2">
                                <span onClick={() => {
                                    if (context) {
                                        Bible.ouvir(context.text)
                                    }
                                }} className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    <i className='bx bx-play' ></i>
                                    Ouvir
                                </span>
                                <span className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                                    <i className='bx bx-bookmark'></i>
                                    Salvar
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="text-white mt-4 flex">#Content</span>
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            Bible.ouvir(livroApi.text)
                        }} className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bx-play' ></i>
                            OUVIR PALAVRA
                        </button>
                        <button onClick={()=>{
                            Bible.ouvir(false)
                        }} className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bx-pause'></i>
                            PARAR
                        </button>
                        <button onClick={heandleProximo} className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bxs-book-bookmark'></i>
                            PROXIMO
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 ml-[3px]">
                        {livroApi ? livroApi.verses.map((verse, index) => (

                            <div className="flex pai-boll items-center gap-2">

                                <span className="flex w-[15px] h-[15px] relative cursor-pointer boll-verse bg-white flex-none rounded-full"></span>
                                <div className="text-white ml-5 bg-[#0000009d] p-4 rounded-xl" key={index}>{verse.text}</div>

                            </div>

                        )) : <Load />}
                    </div>
                    <hr  className="mt-10 mb-10"/>
                    <div className="flex gap-2">
                        <button onClick={heandleProximo} className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bxs-book-bookmark'></i>
                            PROXIMO
                        </button>
                        <button className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bx-bookmark'></i>
                            SALVAR
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
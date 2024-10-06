import { useEffect, useState } from "react";
import { Load } from "../../components/Load";
import Bible from "../../utils/Bible.js";
import { useNavigate, useParams } from "react-router-dom";
import requestAi from "../../utils/gemini.js";
import Verse from "../../components/Livro/Verse.jsx";
import TopoLivro from "../../components/Livro/TopoLivro.jsx";

export default function Livro() {

    const { livro , cap } = useParams()
    const [context, setContext] = useState("")
    const [livroApi, setlivroApi] = useState("")
    const [number, setNumber] = useState(cap ? parseInt(cap) : 1 )


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


        const response = await requestAi("explique sobre esse livro da biblia de forma breve e resumida 4 linhas: " + livro)


        if (response.code == 200) {
            setContext(response.data)
            localStorage.setItem(livro, JSON.stringify(response.data))
        }



    }

    useEffect(() => {

        navigate("/livro/"+livro+"/"+number)

        call()

    }, [number]);

    const heandleProximo = () => {
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
                            <i className='bx bx-home-alt-2'></i>
                            VOLTAR
                        </button>

                    </a>
                    <TopoLivro context={context} livroApi={livroApi}/>
                    <span className="text-white mt-4 flex">#Content</span>
                    <div className="flex overflow-auto py-2 gap-2">
                        <button onClick={() => {
                            Bible.ouvir(livroApi.text)
                        }} className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bx-play' ></i>
                            OUVIR PALAVRA
                        </button>
                        <button onClick={() => {
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

                        <Verse verse={verse} key={index}/>

                        )) : <Load />}
                    </div>
                    <hr className="mt-10 mb-10" />
                    <div className="flex gap-2">
                        <button onClick={heandleProximo} className="back-color btn text-white p-2 mt-3 rounded-md">
                            <i className='bx bxs-book-bookmark'></i>
                            PROXIMO
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
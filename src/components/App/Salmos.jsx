import { useEffect, useRef, useState } from "react";
import Bible from "../../utils/Bible";
import { Load } from "../Load";

export default function Salmos() {

    const bookmark = useRef(null)

    const [gospel, setGospel] = useState()

    useEffect(() => {

        const call = async () => {
            const response = await Bible.getRandomPsalm()

            setGospel(response)

        }
        call()       

    }, []);

    useEffect(() => {

        if (!gospel) return

        const code = String(gospel.verses[0].chapter) + "-" + String(gospel.verses[0].verse) + "-" + gospel.verses[0].book_name  + "-VERSE";
            
        if (localStorage.getItem(code)){
            bookmark.current.classList.add("bxs-bookmark")
        }
    }, [gospel]);

    const handleSaveSalmo = () =>{


        if (!gospel) return

        const code = String(gospel.verses[0].chapter) + "-" + String(gospel.verses[0].verse)+ "-" + gospel.verses[0].book_name  + "-VERSE";
        if (localStorage.getItem(code)){
            localStorage.removeItem(code)
            bookmark.current.classList.remove("bxs-bookmark")
        }else{
            localStorage.setItem(code, gospel.verses[0].text)
            bookmark.current.classList.add("bxs-bookmark")
        }

    }



    return (
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
                <button onClick={handleSaveSalmo} className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                    <i ref={bookmark} className='bx bx-bookmark'></i>
                    Salvar
                </button>
            </div>
        </div>
    )
}
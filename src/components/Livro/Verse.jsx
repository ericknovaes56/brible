import { useEffect, useRef } from "react";
import Bible from "../../utils/Bible.js"

export default function Verse({verse, index}) {

    const verseDiv = useRef(null) 
    const bookmark = useRef(null) 
    
    const handleVerseSave = (e, verse) => {


        const code = String(verse.chapter) + "-" + String(verse.verse)+ "-" + verse.book_name  + "-VERSE";

        if (localStorage.getItem(code)){
            localStorage.removeItem(code)
        }else{
            localStorage.setItem(code, verse.text)
        }
        
        verseDiv.current.classList.toggle("checked")
        bookmark.current.classList.toggle("bxs-bookmark")

    }

    useEffect(() => {

        const code = String(verse.chapter) + "-" + String(verse.verse)+ "-" + verse.book_name  + "-VERSE";
        
        if (localStorage.getItem(code)){
            verseDiv.current.classList.add("checked")
            bookmark.current.classList.add("bxs-bookmark")
        }
       
    }, []);

    return (

        <div className="flex pai-boll items-center gap-2">

            <span ref={verseDiv}  className="flex w-[15px] h-[15px] relative cursor-pointer boll-verse bg-white flex-none rounded-full"></span>
            <div className="text-white ml-5 gap-1 flex flex-col bg-[#0000009d] p-4 rounded-xl" key={index}>
                <span className="mt-2 text-[10px] flex bg-[#131314] w-fit p-1 rounded-md">{verse.chapter} : {verse.verse} : {verse.book_name}</span>
                <p>
                    {verse.text}
                </p>
                <div className="flex gap-2">
                    <button onClick={() => {
                        Bible.ouvir(verse.text)
                    }} className="bg-[#131314] btn text-white p-2 mt-2 rounded-md">
                        <i className='bx bx-play' ></i>
                        OUVIR
                    </button>
                    <button onClick={(e) => handleVerseSave(e, verse)} className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                        <i ref={bookmark} className='bx bx-bookmark'></i>
                        Salvar
                    </button>
                </div>
            </div>

        </div>

    )
}
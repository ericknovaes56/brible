import { useEffect, useRef } from "react"
import { Load } from "../Load"

export default function TopoLivro({ context, livroApi }) {


    const bookmark = useRef(null)

    const handleSaveBook = () => {

        if (!livroApi) return

        const code = livroApi.verses[0].book_name + "-SAVE"

        if (localStorage.getItem(code)) {
            localStorage.removeItem(code)
            bookmark.current.classList.remove("bxs-bookmark")
        } else {
            localStorage.setItem(code, context.text)
            bookmark.current.classList.add("bxs-bookmark")
        }


    }

    useEffect(() => {

        if (!livroApi) return

        const code = livroApi.verses[0].book_name + "-SAVE"

        if (localStorage.getItem(code)) {
            if (!context) return
            bookmark.current.classList.add("bxs-bookmark")
            
        }

    }, [livroApi]);


    return (
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
                {context && livroApi ? <div className="flex gap-2">
                    <span onClick={() => {
                        if (context) {
                            Bible.ouvir(context.text)
                        }
                    }} className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                        <i className='bx bx-play' ></i>
                        Ouvir
                    </span>
                    <button onClick={handleSaveBook} className="mt-2 btn bg-[#131314] cursor-pointer w-fit p-2 rounded-md">
                        <i ref={bookmark} className='bx bx-bookmark'></i>
                        Salvar
                    </button>
                </div> : null}
            </div>
        </div>
    )
}
import Livros from "../../components/Livros";
import ContinuarLendo from "../../components/App/ContinuarLendo.jsx";
import Salmos from "../../components/App/Salmos.jsx";
import SideBar from "../../components/SideBar.jsx";
import { useState, useEffect } from "react";

export default function Chat() {

    const [img, setImg] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [show, setShow] = useState(true);
    const [nome, setNome] = useState('')
    const [user, setUser] = useState('')

    // Função para buscar a foto do usuário no GitHub
    const fetchGitHubUser = async (username) => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            if (data.avatar_url) {
                setImg(data.avatar_url);
                setUser({ nome: username, foto: data.avatar_url })
                
                localStorage.setItem("user", JSON.stringify({ nome: username, foto: data.avatar_url }));
            } else {
                setImg('');
                localStorage.removeItem("user"); // Limpa se não houver dados
            }
        } catch (error) {
            console.error("Erro ao buscar usuário no GitHub:", error);
            setImg('');
            localStorage.removeItem("user"); // Limpa em caso de erro
        }
    };

    const handleSetNome = (e) => {
        const value = e.target.value;
        setNome(value);

        // Limpa o timeout anterior, se houver
        if (typingTimeout) clearTimeout(typingTimeout);

        // Inicia um novo timeout para buscar o usuário depois de 500ms de inatividade
        setTypingTimeout(
            setTimeout(() => {
                if (value) {
                    fetchGitHubUser(value); // Faz a busca do usuário
                } else {
                    setImg('');
                    localStorage.removeItem("user"); // Limpa se o nome estiver vazio
                }
            }, 500)
        );
    };

    return (
        <main>
            <div className="boll"></div>
            {show ? <div className="all w-full h-full flex justify-center items-center absolute bg-[#00000083] z-50">
                <div className="card h-[500px] flex flex-col gap-10 justify-center items-center back-color w-[70%] rounded-xl">
                    <img className="rounded-full w-[100px] h-[100px] object-cover" src={img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kQsW1eslxJsQgeM6SBxV-SgOxvt6zWFg6A&s"} />
                    <input onChange={(e) => handleSetNome(e)} type="text" className="text-white outline-none p-2 px-5 bg-transparent border-2 rounded-md" placeholder="Seu nome" />
                    <div className="flex gap-4">
                        <button onClick={() => setShow(false)} className="bg-[#111180fb] p-3 px-10 text-white rounded-md ">
                            PROXIMO
                        </button>
                        <button className="border-white border-2 p-3 px-10 text-white rounded-md ">
                            VOLTAR
                        </button>
                    </div>
                </div>
            </div> : null}
            <div className="content flex w-full pt-5">
                <div className="flex content-max w-full gap-4">
                    <SideBar />
                    <div className="flex w-full flex-col">
                        <div className="flex topoapp gap-2">
                            <div className="text-white flex-1 bg-[#0000009d] rounded-xl gap-3 flex flex-col p-4">
                                <span className="mt-2 text-[10px] flex bg-[#131314] w-fit p-1 rounded-md">
                                    #Chat
                                </span>
                                <div className="flex  gap-2 items-center">
                                    <span className="bg-[#131314] h-[40px] w-[40px] justify-center rounded-md items-center flex ">
                                        <i class='bx bx-message-dots'></i>
                                    </span>
                                    <p className="text-2xl">
                                        Fale com segurança !
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

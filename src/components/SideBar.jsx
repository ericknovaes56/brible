import Bible from "../utils/Bible";

export default function SideBar() {
    return (
        <nav className="bg-[#13131470] z-[999999999999999999] backdrop-blur-md p-4 bottom-5 right-5 rounded-lg fixed flex-col gap-4 cursor-pointer text-white flex items-center">
            <a href="/">
                <button className="border-gray border-2 btn p-3 items-center rounded-md w-full flex justify-between">
                    <i className='bx bx-home-alt-2'></i>
                </button>
            </a>
            <a href="/chat">
                <button className="border-gray btn border-2 cursor-pointer p-3 items-center rounded-md w-full flex justify-between">
                    <i class='bx bx-message-dots'></i>
                </button>
            </a>
            <button onClick={() => Bible.ouvir(false)} className="border-gray btn border-2 cursor-pointer p-3 items-center rounded-md w-full flex justify-between">
                <i class='bx bx-microphone-off' ></i>
            </button>
        </nav>
    )
}
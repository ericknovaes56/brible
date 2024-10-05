export default function NavBar() {
    return (
        <nav className="menu text-white flex h-[130px]  items-center justify-between">
            <div className="content-max w-full">
                <div className="border-color border-2 p-5 items-center rounded-md w-full flex justify-between">
                    <h1>Brible</h1>
                    <ul className="flex gap-3">
                        <li>
                            <a href="#" className="back-color p-2 rounded-md capitalize btn">inicio</a>
                        </li>
                        <li>
                            <a href="#" className="back-color p-2 rounded-md capitalize btn">salvos</a>
                        </li>
                        <li>
                            <a href="#" className="back-color p-2 rounded-md capitalize btn" >aleatorio</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
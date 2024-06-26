import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav
            className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="self-center text-2xl font-semibold whitespace-nowrap">
                    testeci_arlanariandi
                </div>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button data-collapse-toggle="navbar-sticky" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <NavLink to={'/'} end
                                     className={({isActive}) => `block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 ${isActive ? 'bg-blue-700 md:text-blue-700' : ''}`}>
                                Triangle
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/convert-to-words'}
                                     className={({isActive}) => `block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 ${isActive ? 'bg-blue-700 md:text-blue-700' : ''}`}>
                                Convert To Words
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/department'}
                                     className={({isActive}) => `block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 ${isActive ? 'bg-blue-700 md:text-blue-700' : ''}`}>
                                Department
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/level'}
                                     className={({isActive}) => `block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 ${isActive ? 'bg-blue-700 md:text-blue-700' : ''}`}>
                                Level
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/jabatan'}
                                     className={({isActive}) => `block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 ${isActive ? 'bg-blue-700 md:text-blue-700' : ''}`}>
                                Jabatan
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/karyawan'}
                                     className={({isActive}) => `block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 ${isActive ? 'bg-blue-700 md:text-blue-700' : ''}`}>
                                Karyawan
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
export default Navbar;

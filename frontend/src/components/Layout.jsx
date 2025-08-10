
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux'
import SideBar from "./SideBar";
import MiniSideBar from "./MiniSideBar";
import { toggleSidebar } from '../redux/sidebarslice';
const Layout = () => {
    const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
    const isdark = useSelector((state) => state.theme.isdark);
    const dispatch = useDispatch()
    return (
        <>
            <div className={`${isdark ? "dark" : ""} scrollbar-custom min-h-screen bg-gray-50`}>
                {/* Header */}
                <Header />
                {/* Sidebar If Open SideBar render else MiniSideBar */}
                {sidebarOpen ? <SideBar /> : <MiniSideBar />}

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed top-16 left-64 right-0 bottom-0  bg-opacity-50 z-20 lg:hidden"
                        onClick={() => dispatch(toggleSidebar())}
                    ></div>
                )}

                <Outlet />
               
            </div>
        </>
    )
}

export default Layout
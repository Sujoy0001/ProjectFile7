import { Outlet } from "react-router-dom";

import TopNav from "./TopNav";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopNav />
            <Navbar />
                <main className="flex-grow container mx-auto px-4 py-6">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}
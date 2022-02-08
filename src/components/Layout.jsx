import { Outlet } from "react-router-dom";

export function Layout () {
    return (
        <>
            <div>
                <div className="container mt-5">
                    <h2>Dashboard</h2>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="max-w-sm md:max-w-7xl mx-auto">
    <Outlet />
  </div>
);

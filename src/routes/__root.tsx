import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../pages/NotFoundPage";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header />
        <div className="font-inter min-h-screen max-w-screen flex flex-col pt-16">
          <Outlet />
        </div>

        <ToastContainer />
      </>
    );
  },
  notFoundComponent: NotFoundPage
});

import React from "react";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar = () => {
  return (
    <>
      <DesktopNavbar className="hidden md:flex" />
      <MobileNavbar className="block md:hidden" />
    </>
  );
};

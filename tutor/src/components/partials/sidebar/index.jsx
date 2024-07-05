
import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems } from "../../../constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "../../../hooks/useSidebar";
import useSemiDark from "../../../hooks/useSemiDark";
import useSkin from "../../../hooks/useSkin";

const Sidebar = ({Current_user}) => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();

  return (
   

    <div className={isSemiDark ? "dark" : ""}>
<div
  className= {`sidebar-wrapper bg-white dark:bg-slate-800 w-[248px] shadow-base`}
>
  <SidebarLogo menuHover={menuHover} />
  <div
    className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none opacity-0`}
  ></div>

  <SimpleBar
    className="sidebar-menu px-4 h-[calc(100%-80px)]"
    scrollableNodeProps={{ ref: scrollableNodeRef }}
  >
    <Navmenu menus={menuItems} Current_user ={Current_user} />
  </SimpleBar>
</div>
</div>
  );
};

export default Sidebar;

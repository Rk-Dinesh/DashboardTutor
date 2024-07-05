import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../../../hooks/useDarkMode";
import useSidebar from "../../../hooks/useSidebar";
import useSemiDark from "../../../hooks/useSemiDark";
import useSkin from "../../../hooks/useSkin";
import MobileLogo from "../../../assets/Protutor_Logo.png";

const SidebarLogo = ({ menuHover }) => {
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();

  const [isSemiDark] = useSemiDark();

  const [skin] = useSkin();
  return (
  

    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 border-none`}>
      <Link to="/dashboard">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img
                src={MobileLogo}
                alt=""
                style={{ height: "100", width: "60px" }}
              />
            ) : (
              <img src={MobileLogo} alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <p className="text-dark-600">
                <b>Pro Tutor </b>
              </p>
            </div>
          )}
        </div>
      </Link>
  
    </div>

  );
};

export default SidebarLogo;

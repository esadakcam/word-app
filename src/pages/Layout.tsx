import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

import { useEffect, useState } from "react";

const menuItems = [
  {
    label: <Link to="/words">Words</Link>,
    key: "words",
    title: "Words",
  },
  {
    label: <Link to="/phrases">Phrases</Link>,
    key: "phrases",
    title: "Phrases",
  },
];

export const Layout = () => {
  const [currentPage, setCurrentPage] = useState("words");
  const onClick: MenuProps["onClick"] = (e) => setCurrentPage(e.key);
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (pathname === "/") {
      setCurrentPage("words");
    } else {
      setCurrentPage("phrases");
    }
  }, [pathname]);

  return (
    <>
      <Menu
        mode="horizontal"
        items={menuItems}
        onClick={onClick}
        selectedKeys={[currentPage]}
      />
      <div style={{ padding: "25px" }}>
        <Outlet />
      </div>
    </>
  );
};

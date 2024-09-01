import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/words");
    } else if (pathname === "/words") {
      setCurrentPage("words");
    } else {
      setCurrentPage("phrases");
    }
    console.log(pathname);
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

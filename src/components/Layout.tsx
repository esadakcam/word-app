import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

import { useEffect, useState } from "react";

const menuItems = [
  {
    label: <Link to="/wordapp/words">Words</Link>,
    key: "words",
    title: "Words",
  },
  {
    label: <Link to="/wordapp/phrases">Phrases</Link>,
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
    switch (pathname) {
      case "/wordapp/":
      case "/wordapp":
        navigate("/wordapp/words");
        break;
      case "/wordapp/words":
        setCurrentPage("words");
        break;
      case "/wordapp/phrases":
        setCurrentPage("phrases");
        break;
      default:
        setCurrentPage("words");
        break;
    }
  }, [pathname, navigate]);

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

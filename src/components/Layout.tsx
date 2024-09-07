import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Flex } from "antd";

import { useEffect, useState } from "react";

export const Layout = () => {
  const [_, setCurrentPage] = useState("words");
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {
    switch (pathname) {
      case "/":
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
    <Flex justify="center" align="center">
      <Outlet />
    </Flex>
  );
};

import { useState, useEffect } from "react";
import { WordEntry } from "../../types/global";
import { WordCard } from "../components/WordCard";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const order = [
  { label: "CEFR Level", key: "cefr" },
  { label: "Random", key: "random" },
];

const cefrLevels = [
  { label: "A1", key: "a1" },
  { label: "A2", key: "a2" },
  { label: "B1", key: "b1" },
  { label: "B2", key: "b2" },
  { label: "C1", key: "c1" },
];

const siderItems: MenuProps["items"] = order.map((ord) => {
  return {
    key: ord.key,
    label: ord.label,
    children: ord.key === "cefr" ? cefrLevels : undefined,
  };
});

export const WordPage = () => {
  const [requestNew, setRequestNew] = useState(false);
  const [orderBy, setOrderBy] = useState(
    localStorage.getItem("orderBy") || "random"
  );
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") === "true"
  );

  const { isPending, isError, data, error, refetch, isRefetching } = useQuery({
    queryKey: ["word", orderBy],
    queryFn: async () => {
      const response = await fetch(`/wordapp/api/words/${orderBy}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setRequestNew(false);
      return response.json() as Promise<WordEntry>;
    },
  });

  useEffect(() => {
    refetch();
  }, [requestNew]);

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <Layout>
        <Sider
          width={150}
          theme="light"
          collapsed={collapsed}
          collapsedWidth={0}
        >
          <div
            style={{
              padding: "16px",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Order
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={[orderBy]}
            style={{ height: "100%", borderRight: 0 }}
            items={siderItems}
            onSelect={({ key }) => {
              setOrderBy(key);
              localStorage.setItem("orderBy", key);
            }}
          />
        </Sider>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            setCollapsed(!collapsed);
            localStorage.setItem("collapsed", (!collapsed).toString());
          }}
        />
        <Layout>
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ height: "100vh" }}
          >
            <Flex vertical align="center" justify="center">
              <WordCard
                word={data}
                isLoading={isPending || isRefetching}
              ></WordCard>
              <Button type="primary" onClick={() => setRequestNew(true)}>
                New Word
              </Button>
            </Flex>
          </Flex>
        </Layout>
      </Layout>
    </>
  );
};

import { useState, useEffect } from "react";
import { WordEntry } from "../../types/global";
import { WordCard } from "../components/WordCard";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Radio } from "antd";

const order = [
  { label: "Random", value: "random" },
  { label: "CEFR Level", value: "cefr" },
];

const cefrLevels = [
  { label: "A1", value: "a1" },
  { label: "A2", value: "a2" },
  { label: "B1", value: "b1" },
  { label: "B2", value: "b2" },
  { label: "C1", value: "c1" },
  { label: "C2", value: "c2" },
];

export const WordPage = () => {
  const [requestNew, setRequestNew] = useState(false);
  const [orderBy, setOrderBy] = useState("random");
  const [cefrLevel, setCefrLevel] = useState("a1");

  const { isPending, isError, data, error, refetch, isRefetching } = useQuery({
    queryKey: ["word", orderBy, cefrLevel],
    queryFn: async () => {
      const endpoint = orderBy === "random" ? "random" : `cefr/${cefrLevel}`;
      const response = await fetch(`/wordapp/api/words/${endpoint}`);
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
      <Flex vertical align="center" justify="center">
        <Flex vertical align="center" gap="large">
          <Flex vertical justify="center" align="center" gap="middle">
            Word Order
            <Radio.Group
              options={order}
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
              optionType="button"
              buttonStyle="solid"
            />
          </Flex>
          {orderBy === "cefr" && (
            <Flex vertical justify="center" align="center" gap="middle">
              Start Level
              <Radio.Group
                options={cefrLevels}
                onChange={(e) => setCefrLevel(e.target.value)}
                value={cefrLevel}
                optionType="button"
                buttonStyle="solid"
              />
            </Flex>
          )}
        </Flex>
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
    </>
  );
};

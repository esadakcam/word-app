import { useState, useEffect } from "react";
import { WordEntry } from "../../types/global";
import { WordCard } from "../components/WordCard";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex } from "antd";
export const WordPage = () => {
  const [requestNew, setRequestNew] = useState(false);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["word"],
    queryFn: async () => {
      const response = await fetch("/api/words/random");
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
        <WordCard word={data} isLoading={isPending}></WordCard>
        <Button type="primary" onClick={() => setRequestNew(true)}>
          New Word
        </Button>
      </Flex>
    </>
  );
};

import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { WordEntry } from "../../types/global";
import { WordCard } from "../components/WordCard";
export const WordPage = () => {
  const [word, setWord] = useState<WordEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestNew, setRequestNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/words/random");
      const data = await response.json();
      setWord(data);
      setLoading(false);
    };
    fetchData();
  }, [requestNew]);
  return <WordCard word={word!} isLoading={loading}></WordCard>;
};

import { WordEntry } from "../../types/global";
import { Card } from "antd";

type WordCardProps = {
  word: WordEntry | null;
  isLoading: boolean;
};

export const WordCard = ({ word, isLoading }: WordCardProps) => {
  return (
    <>
      <Card loading={isLoading} style={{ minWidth: 300 }}>
        <Card.Meta title={word?.word}></Card.Meta>
      </Card>
    </>
  );
};

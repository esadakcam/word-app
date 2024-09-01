import { useEffect, useState } from "react";
import { WordEntry } from "../../types/global";
import { Card } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

type WordCardProps = {
  word: WordEntry | undefined;
  isLoading: boolean;
};

export const WordCard = ({ word, isLoading }: WordCardProps) => {
  const [showDefinition, setShowDefinition] = useState(false);
  useEffect(() => {
    setShowDefinition(false);
  }, [word]);
  return (
    <>
      <Card
        actions={[
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => setShowDefinition((prv) => !prv)}
          />,
        ]}
        loading={isLoading}
        style={{ width: "calc(100vw - 100px)", maxWidth: 500, margin: "60px" }}
      >
        <Card.Meta
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{word?.word}</span>
              <span>{word?.type}</span>
              <span>{word?.phon_br}</span>
            </div>
          }
          description={
            <>
              <p>Definition: {showDefinition ? word?.definition : "..."}</p>
              <p>CEFR Level: {word?.cefr.toUpperCase()}</p>
              <p>Example: {word?.example}</p>
            </>
          }
        ></Card.Meta>
      </Card>
    </>
  );
};

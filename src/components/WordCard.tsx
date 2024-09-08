import { useEffect, useState } from "react";
import { WordEntry } from "../../types/global";
import { Button, Card } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

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
          <Button
            key="toggle"
            type="link"
            icon={showDefinition ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setShowDefinition((prv) => !prv)}
          >
            {showDefinition ? "Hide Definition" : "Show Definition"}
          </Button>,
        ]}
        loading={isLoading}
        style={{ width: "calc(100vw - 150px)", maxWidth: 500, margin: "60px" }}
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

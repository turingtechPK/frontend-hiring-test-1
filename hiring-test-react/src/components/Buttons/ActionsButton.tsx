import { Button } from "@mui/material";

import { stylesMui } from "./styles";

import { Row } from "../../types";

interface ActionsButtonProps {
  onClick: (row: Row) => void;
  row: Row;
}

const ActionsButton: React.FC<ActionsButtonProps> = ({ onClick, row }) => {
  const handleClick = () => {
    onClick(row);
  };

  return (
    <Button sx={stylesMui.actionsButton} onClick={handleClick}>
      Add Note
    </Button>
  );
};

export default ActionsButton;

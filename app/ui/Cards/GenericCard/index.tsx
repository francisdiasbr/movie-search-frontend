import React, { ReactNode, CSSProperties } from "react";

import * as S from "./styles";

interface GenericCardProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const GenericCard = ({ children, style}: GenericCardProps) => {
  return (
    <S.Container style={{ overflow: "auto", ...style }}>
      {children}
    </S.Container>
  );
}

export default GenericCard;
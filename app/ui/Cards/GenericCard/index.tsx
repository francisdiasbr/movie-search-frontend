import React from "react";

import * as S from "./styles";

const GenericCard = ({ children }: { children: React.ReactNode }) => {
  return <S.Container>{children}</S.Container>;
}

export default GenericCard;
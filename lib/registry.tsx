"use client";

import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Apenas use este hook do lado do cliente
  const [sheet] = useState(() => new ServerStyleSheet());

  if (typeof window === 'undefined') {
    return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
  } else {
    return <>{children}</>;
  }
}
import { createGlobalStyle } from 'styled-components';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background.page};
    color: ${({ theme }) => theme.colors.neutral.level2};
    font-family: ${({ theme }) => theme.fonts.fontSecondary};
    font-weight: ${({ theme }) => theme.fonts.regular};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.fontPrimary};
    font-weight: ${({ theme }) => theme.fonts.bold};
    margin: 0 0 ${({ theme }) => theme.spacing.md};
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.2rem; }

  p {
    font-size: 1.125rem;
    line-height: 1.3;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  input,
  textarea,
  select {
    border: 1px solid ${({ theme }) => theme.colors.neutral.level7};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }

  input:not([aria-autocomplete="list"]):focus,
  textarea:focus,
  select:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary.main};
  }

  button {
    background-color: ${({ theme }) => theme.colors.secondary.main};
    border: 1px solid ${({ theme }) => theme.colors.secondary.dark};
    border-radius: ${({ theme }) => theme.radius.sm};
    color: ${({ theme }) => theme.colors.secondary.contrastText};
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing(1.5)};
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }

  button:disabled,
  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  dialog {
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    max-width: 90vw;
    padding: 0;
    width: 600px;
  }

  dialog[open] {
    display: flex;
    flex-direction: column;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  dialog.dialog-wide {
    width: 900px;
  }

  .dialog-header {
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing(2.5)};
  }

  .dialog-header h3 {
    margin: 0;
  }

  .dialog-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }

  .dialog-close:hover {
    background: ${({ theme }) => theme.colors.neutral.level10};
  }

  .dialog-body {
    max-height: 75vh;
    overflow-y: auto;
    padding: ${({ theme }) => theme.spacing(2.5)};
  }

  .dialog-footer {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.level9};
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    justify-content: flex-end;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing(2.5)};
  }

  .dialog-field {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xxs};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .dialog-field label {
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.fonts.medium};
  }

  .dialog-field input,
  .dialog-field textarea {
    width: 100%;
  }

  .dialog-tabs {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .dialog-tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    color: ${({ theme }) => theme.colors.neutral.level3};
    cursor: pointer;
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }

  .dialog-tab:hover {
    background: none;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .dialog-tab.active {
    border-bottom-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .dialog-ref-row {
    align-items: center;
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .dialog-ref-row input {
    flex: 1;
  }
`;

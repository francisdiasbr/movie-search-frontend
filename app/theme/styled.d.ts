import 'styled-components';
import type { Theme } from './movieSearch';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

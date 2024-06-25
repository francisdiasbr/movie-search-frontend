import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import App from './src/app/App';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('movie-search-frontend', () => Main);
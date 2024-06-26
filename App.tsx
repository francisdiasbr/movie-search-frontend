import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import store from './src/api/store';
import App from './src/app/App';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent('movie-search-frontend', () => Main);
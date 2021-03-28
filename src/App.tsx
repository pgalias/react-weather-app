import React from 'react';
import styles from './app.module.css';
import { Forecast } from './views/forecast/Forecast';

const App: React.FunctionComponent = () => {
  return (
    <div className={styles.app}>
      <Forecast />
    </div>
  );
};

export default App;

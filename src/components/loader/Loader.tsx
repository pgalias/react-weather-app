import React, { FunctionComponent } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import styles from './loader.module.css';

export const Loader: FunctionComponent = () => (
  <div className={styles.loaderContainer} role="alert" aria-busy="true">
    <span className={`${styles.loader} animate-spin`}>
      <ReactAnimatedWeather icon="CLEAR_DAY" size={128} animate={false} color="#D97706" />
    </span>
  </div>
);

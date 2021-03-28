import React, { FunctionComponent } from 'react';
import styles from './info.module.css';

type Props = {
  label: string;
  value: number;
  unit: string;
};

export const Info: FunctionComponent<Props> = ({ label, value, unit }) => (
  <p className={styles.info}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
    <span className={styles.unit}>{unit}</span>
  </p>
);

import React, { FunctionComponent } from 'react';
import styles from './info.module.css';

type Props = {
  label: string;
  value: number;
  unit: string;
  icon?: JSX.Element;
};

export const Info: FunctionComponent<Props> = ({ label, value, unit, icon }) => (
  <p className={styles.info} role="listitem">
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
    <span className={styles.unit}>
      {unit}
      {icon}
    </span>
  </p>
);

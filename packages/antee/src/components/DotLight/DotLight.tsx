import React, { FunctionComponent } from 'react';
import styles from './DotLight.module.scss';

export type DotLightProps = {
  width?: number | string;
};

const DotLight: FunctionComponent<DotLightProps> = ({ width }) => {
  return <span className={styles.dot} style={{ width, height: width }} />;
};

export default DotLight;

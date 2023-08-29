import { Text } from '@components/atoms/Text';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardMenuItemProps = DefaultPageProps & {
  className?: string;
  label?: string;
  onClick?: () => void;
};

function DashboardMenuItem(props: DashboardMenuItemProps): JSX.Element {
  const handleBox2 = () => {};
  return (
    <div className={`${styles.molecule} ${props.className}`}>
      <div onClick={handleBox2} className={styles.box_2}>
        <Text textType="Text" className={styles.text_2}>
          {props.label}
        </Text>
      </div>
    </div>
  );
}

export default DashboardMenuItem;

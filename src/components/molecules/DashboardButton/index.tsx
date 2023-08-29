import { Text } from '@components/atoms/Text';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardButtonProps = DefaultPageProps & {
  className?: string;
  label?: string;
  onClick?: () => void;
};

function DashboardButton(props: DashboardButtonProps): JSX.Element {
  const handleBox1 = () => {
    const { onClick } = props;
    return onClick && onClick();
  };
  return (
    <div className={`${styles.molecule_container} ${props.className}`}>
      <div onClick={handleBox1} className={styles.box_1}>
        <Text textType="Text" className={styles.text_1}>
          {props.label}
        </Text>
      </div>
    </div>
  );
}

export default DashboardButton;

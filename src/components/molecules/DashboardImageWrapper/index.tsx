import Image from 'next/image';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardImageWrapperProps = DefaultPageProps & {
  className?: string;
};

function DashboardImageWrapper(props: DashboardImageWrapperProps): JSX.Element {
  return (
    <div className={`${styles.molecule} ${props.className}`}>
      <div className={styles.box_2}>
        <Image
          className={styles.image_2}
          width="167"
          height="38"
          src="https://studio.jitera.app/jitera-white-logo.svg"
          alt="image_2"
        />
      </div>
    </div>
  );
}

export default DashboardImageWrapper;

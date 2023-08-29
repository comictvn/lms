import DashboardImageWrapper from '@components/molecules/DashboardImageWrapper';
import DashboardMenu from '@components/molecules/DashboardMenu';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardFooterProps = DefaultPageProps & {
  className?: string;
};

function DashboardFooter(props: DashboardFooterProps): JSX.Element {
  return (
    <div className={`${styles.molecule} ${props.className}`}>
      <div className={styles.box_2}>
        <div className={styles.box_4}>
          <DashboardImageWrapper className={styles.molecule_3} />
          <div className={styles.box_6}>
            <DashboardMenu className={styles.molecule_3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardFooter;

import DashboardMenuItem from '@components/molecules/DashboardMenuItem';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardMenuProps = DefaultPageProps & {
  className?: string;
};

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
  return (
    <div className={`${styles.molecule} ${props.className}`}>
      <div className={styles.box_2}>
        <DashboardMenuItem className={styles.dashboardnavbarmenuitem_1} label={`Users`} />
      </div>
    </div>
  );
}

export default DashboardMenu;

import DashboardMenuItem from '@components/molecules/DashboardMenuItem';
import { useNavigateService } from '@services/navigate';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardSidebarProps = DefaultPageProps & {
  className?: string;
};

function DashboardSidebar(props: DashboardSidebarProps): JSX.Element {
  const handleDashboardmenuitem1OnClick = () => {};
  return (
    <div className={`${styles.molecule} ${props.className}`}>
      <div className={styles.box_2}>
        <DashboardMenuItem
          onClick={handleDashboardmenuitem1OnClick}
          className={styles.dashboardmenuitem_1}
          label={`Users`}
        />
      </div>
    </div>
  );
}

export default DashboardSidebar;

import DashboardImageWrapper from '@components/molecules/DashboardImageWrapper';
import DashboardMenu from '@components/molecules/DashboardMenu';
import { Icon } from '@components/atoms/Icon';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardNavbarProps = DefaultPageProps & {
  className?: string;
};

function DashboardNavbar(props: DashboardNavbarProps): JSX.Element {
  const handleBox6 = () => {};
  return (
    <div className={`${styles.molecule} ${props.className}`}>
      <div className={styles.box_2}>
        <DashboardImageWrapper className={styles.molecule_3} />
        <div className={styles.box_4}>
          <DashboardMenu className={styles.molecule_3} />
          <div onClick={handleBox6} className={styles.box_6}>
            <Icon iconName="MdOutlineMenu" size="24" className={styles.icon_2} color="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;

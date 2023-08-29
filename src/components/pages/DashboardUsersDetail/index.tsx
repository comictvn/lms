import DashboardNavbar from '@components/molecules/DashboardNavbar';
import { Row } from '@components/atoms/Row';
import { Col } from '@components/atoms/Col';
import DashboardSidebar from '@components/molecules/DashboardSidebar';
import { Text } from '@components/atoms/Text';
import DashboardFooter from '@components/molecules/DashboardFooter';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardUsersDetailProps = DefaultPageProps & {
  className?: string;
};

function DashboardUsersDetail(props: DashboardUsersDetailProps): JSX.Element {
  return (
    <div className={styles.page_container}>
      <DashboardNavbar className={styles.dashboardnavbar_1} />
      <div className={styles.dashboard_main}>
        <div className={styles.dashboard_main_wrapper}>
          <Row gutter={[30, 30]} justify="start" align="top" className={styles.row_1}>
            <Col xs={24} md={24} xl={6} className={styles.col_1}>
              <DashboardSidebar className={styles.dashboardnavbar_1} />
            </Col>
            <Col xs={24} md={24} xl={18} className={styles.col_2}>
              <div className={styles.dashboard_content}>
                <div className={styles.dashboard_content_title}>
                  <Text textType="Text" className={styles.text_9}>{`Users Detail`}</Text>
                </div>
                <div className={styles.dashboard_content_filter_table} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <DashboardFooter className={styles.dashboardnavbar_1} />
    </div>
  );
}

export default DashboardUsersDetail;

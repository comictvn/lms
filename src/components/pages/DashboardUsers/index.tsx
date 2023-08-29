import { FilterUserResponseBody, useFilterUserQuery, FilterUserRequestBody } from '@services/user';
import React, { useMemo, useState } from 'react';
import { TableColumnDefinition, Table } from '@components/atoms/Table';
import DashboardButton from '@components/molecules/DashboardButton';
import DashboardNavbar from '@components/molecules/DashboardNavbar';
import { Row } from '@components/atoms/Row';
import { Col } from '@components/atoms/Col';
import DashboardSidebar from '@components/molecules/DashboardSidebar';
import { Text } from '@components/atoms/Text';
import DashboardFooter from '@components/molecules/DashboardFooter';
import { Modal } from '@components/atoms/Modal';
import { useNavigateService } from '@services/navigate';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DashboardUsersProps = DefaultPageProps & {
  className?: string;
};

function DashboardUsers(props: DashboardUsersProps): JSX.Element {
  const [filterUserParams, setFilterUserParams] = useState<Partial<FilterUserRequestBody>>({});
  const filterUserQuery = useFilterUserQuery(filterUserParams);
  const columnsTable1 = useMemo<TableColumnDefinition<FilterUserResponseBody['users'][number]>[]>(
    () => [
      { name: `Id`, path: '``', sortable: false },
      { name: `Created At`, path: '``', sortable: false },
      { name: `Updated At`, path: '``', sortable: false },
    ],
    [],
  );
  const actionsTable1 = useMemo<TableColumnDefinition<FilterUserResponseBody['users'][number]>[]>(
    () => [
      {
        name: `Delete`,
        renderColumn: (innerProps) => (
          <DashboardButton
            label={`Delete`}
            onClick={handleOnClickTable1Delete}
            {...innerProps.row.original}
          />
        ),
      },
      {
        name: `Edit`,
        renderColumn: (innerProps) => (
          <DashboardButton
            label={`Edit`}
            onClick={handleOnClickTable1Edit}
            {...innerProps.row.original}
          />
        ),
      },
    ],
    [],
  );

  const handleOnClickTable1Delete = () => {
    Modal.show(<div />);
  };
  const handleOnClickTable1Edit = () => {};
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
                  <Text textType="Text" className={styles.text_9}>{`Users`}</Text>
                </div>
                <div className={styles.dashboard_content_filter_table}>
                  <div className={styles.box_8}>
                    <Table
                      data={filterUserQuery.data?.users}
                      isHeaderVisible
                      isFooterVisible={false}
                      className={styles.table_1}
                      columns={columnsTable1}
                      actions={actionsTable1}
                      wrapperStyle={{
                        width: '100%',
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(0, 0, 0)',
                        overflowX: 'auto',
                      }}
                      tableStyle={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(0, 0, 0)',
                        width: '100%',
                        border: '1px solid rgb(0, 0, 0)',
                      }}
                      headerColumnStyle={{
                        backgroundColor: 'rgb(0, 21, 41)',
                        color: 'rgb(255, 255, 255)',
                        fontSize: '16px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '8px 16px 8px 16px',
                      }}
                      bodyColumnStyle={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '4px 8px 4px 8px',
                      }}
                      footerColumnStyle={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '16px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        border: '1px solid rgb(0, 0, 0)',
                        padding: '8px 16px 8px 16px',
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <DashboardFooter className={styles.dashboardnavbar_1} />
    </div>
  );
}

export default DashboardUsers;

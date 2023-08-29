import { Row } from '@components/atoms/Row';
import { Col } from '@components/atoms/Col';
import Image from 'next/image';
import DefaultHeaderMenu from '@components/molecules/DefaultHeaderMenu';
import DefaultHamburgerMenu from '@components/molecules/DefaultHamburgerMenu';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DefaultHeaderProps = DefaultPageProps & {
  className?: string;
};

function DefaultHeader(props: DefaultHeaderProps): JSX.Element {
  return (
    <div className={`${styles.header_0} ${props.className}`}>
      <div className={styles.header_box_0}>
        <Row
          gutter={[32, 32]}
          justify="space-between"
          align="middle"
          className={styles.header_row_0}
        >
          <Col flex="100px" className={styles.header_col_0}>
            <div className={styles.header_box_1}>
              <Image
                className={styles.header_image_0}
                width="100"
                height="0"
                src="https://studio.jitera.app/jitera-white-logo.svg"
                alt="header_image_0"
              />
            </div>
          </Col>
          <Col flex="1px" className={styles.header_col_1}>
            <DefaultHeaderMenu className={styles.header_defaultheadermenu_0} />
          </Col>
          <Col className={styles.header_col_2}>
            <DefaultHamburgerMenu className={styles.header_defaulthamburgermenu_1} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DefaultHeader;

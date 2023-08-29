import DefaultHeader from '@components/molecules/DefaultHeader';
import { Text } from '@components/atoms/Text';
import { DateTimePicker } from '@components/atoms/DateTimePicker';
import DefaultFooter from '@components/molecules/DefaultFooter';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type HomeProps = DefaultPageProps & {
  className?: string;
};

function Home(props: HomeProps): JSX.Element {
  return (
    <div className={styles.page_container}>
      <DefaultHeader className={styles.defaultheader_1} />
      <div className={styles.box_0}>
        <div className={styles.datetimepicker_1_container}>
          <div className={styles.datetimepicker_1_inner}>
            <Text textType="Text" className={styles.datetimepicker_1_label}>{`Label`}</Text>
            <Text textType="Text" className={styles.datetimepicker_1_required}>{`*`}</Text>
          </div>
          <DateTimePicker
            defaultValue={``}
            picker="date"
            showTime={false}
            format="YYYY/MM/DD"
            className={styles.datetimepicker_1}
          />
        </div>
      </div>
      <DefaultFooter className={styles.defaultheader_1} />
    </div>
  );
}

export default Home;

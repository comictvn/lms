import { Text } from '@components/atoms/Text';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type Property1DefaultRequiredFalseQuestionFalseFillFalseProps = DefaultPageProps & {
  className?: string;
};

function Property1DefaultRequiredFalseQuestionFalseFillFalse(
  props: Property1DefaultRequiredFalseQuestionFalseFillFalseProps,
): JSX.Element {
  return (
    <div className={`${styles.page_container} ${props.className}`}>
      <div className={styles.text_field_title_15}>
        <Text className={styles.text_15}>{`Email`}</Text>
      </div>
      <div className={styles.assets_17}>
        <Text className={styles.text_17}>{`test@gmail.com`}</Text>
      </div>
    </div>
  );
}

export default Property1DefaultRequiredFalseQuestionFalseFillFalse;

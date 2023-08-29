import { Text } from '@components/atoms/Text';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type Property1ActiveProps = DefaultPageProps & {
  className?: string;
};

function Property1Active(props: Property1ActiveProps): JSX.Element {
  return (
    <div className={`${styles.page_container} ${props.className}`}>
      <Text className={styles.text_14}>{`Sign up`}</Text>
    </div>
  );
}

export default Property1Active;

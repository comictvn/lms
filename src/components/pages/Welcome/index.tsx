import Background from '@components/molecules/Background';
import { Text } from '@components/atoms/Text';
import Property1Active from '@components/molecules/Property1Active';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type WelcomeProps = DefaultPageProps & {
  className?: string;
};

function Welcome(props: WelcomeProps): JSX.Element {
  return (
    <div className={styles.page_container}>
      <div className={styles.container_7}>
        <Background className={styles.background_2} />
        <div className={styles.wrapper_7}>
          <Text className={styles.text_4}>{`Awesome Note`}</Text>
          <div className={styles.card_7}>
            <Text className={styles.text_6}>{`Welcome to our take note application`}</Text>
            <Property1Active className={styles.common_button_6} />
            <Text className={styles.text_7}>{`Already a member? Log in`}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

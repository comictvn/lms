import Background from '@components/molecules/Background';
import { Text } from '@components/atoms/Text';
import Property1DefaultRequiredFalseQuestionFalseFillFalse from '@components/molecules/Property1DefaultRequiredFalseQuestionFalseFillFalse';
import Property1Active from '@components/molecules/Property1Active';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type SignUpProps = DefaultPageProps & {
  className?: string;
};

function SignUp(props: SignUpProps): JSX.Element {
  return (
    <div className={styles.page_container}>
      <div className={styles.container_9}>
        <Background className={styles.background_2} />
        <div className={styles.wrapper_9}>
          <Text textType="Text" className={styles.text_4}>{`Awesome Note`}</Text>
          <div className={styles.card_9}>
            <Text textType="Text" className={styles.text_6}>{`Sign up`}</Text>
            <div className={styles.sign_up_form_8}>
              <Property1DefaultRequiredFalseQuestionFalseFillFalse
                className={styles.text_field_7}
              />
              <Property1DefaultRequiredFalseQuestionFalseFillFalse
                className={styles.text_field_7}
              />
              <Text
                textType="Text"
                className={styles.text_8}
              >{`By registering, you agree to the privacy policy and membership agreement.`}</Text>
              <Property1Active className={styles.common_button_8} />
            </div>
            <Text textType="Text" className={styles.text_9}>{`Already a member? Log in`}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

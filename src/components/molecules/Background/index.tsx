import assets from '@assets/index';
import Image from 'next/image';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type BackgroundProps = DefaultPageProps & {
  className?: string;
};

function Background(props: BackgroundProps): JSX.Element {
  return (
    <div className={`${styles.page_container} ${props.className}`}>
      <Image className={styles.image_18} src={assets('1667540822372-png')} alt="Image18" />
    </div>
  );
}

export default Background;

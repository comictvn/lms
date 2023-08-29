import type { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page500Page from '@components/pages/Page500';

export async function getStaticProps(context: NextPageContext) {
  const { locale = 'ja' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      seo: {
        title: 'harry_pro1_04jan23z',
        description: '',
      },
    },
  };
}

export default Page500Page;

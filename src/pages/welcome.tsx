import type { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate } from 'react-query';
import { initServerInfo } from '@utils/serverSide';
import WelcomePage from '@components/pages/Welcome';

export async function getStaticProps(context: NextPageContext) {
  const { locale = 'ja', query } = context;
  const options: {
    props?: Record<string, unknown>;
    redirect?: Record<string, unknown>;
  } = {};
  const { queryClient } = await initServerInfo(context, { session: false });

  return {
    ...options,
    props: {
      query: query || null,
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: 'harry_pro1_04jan23z',
        description: '',
      },
      ...(await serverSideTranslations(locale)),
      ...(options.props || {}),
    },
  };
}

export default WelcomePage;

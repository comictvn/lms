import type { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate } from 'react-query';
import { initServerInfo, errorHandler } from '@utils/serverSide';
import DashboardUsersDetailPage from '@components/pages/DashboardUsersDetail';

export async function getServerSideProps(context: NextPageContext) {
  const { locale = 'ja', query } = context;
  const options: {
    props?: Record<string, unknown>;
    redirect?: Record<string, unknown>;
  } = {};
  const { session, queryClient } = await initServerInfo(context);

  if (!session?.user?.accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
  } catch (error: unknown) {
    return errorHandler(error);
  }
  return {
    ...options,
    props: {
      query: query || null,
      session,
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

export default DashboardUsersDetailPage;

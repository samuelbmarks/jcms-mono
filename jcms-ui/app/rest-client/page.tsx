import type { Route } from 'next';
import RestClient from '~/app/rest-client/RestClient';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { getRouteMetadata } from '~/lib/utils';

const PATH: Route = '/rest-client';
export const metadata = getRouteMetadata(PATH);

export default function RestClientPage() {
  
  return (
    <>
      <PageTitle of={PATH} />
      <RestClient />
      <div style={{height: 18}}></div>
      <PageNavigation of={PATH} />
    </>
  );
}

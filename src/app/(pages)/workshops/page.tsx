export const dynamic = 'force-dynamic';

import { getPublicWorkshops } from '../../api/customerApi';
import WorkshopCatalog from '../../components/WorkshopCatalog';
import { Workshop } from '@/types';

async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const workshops = await getPublicWorkshops();
    return Array.isArray(workshops) ? workshops : [];
  } catch (error) {
    console.error('Failed to fetch workshops:', error);
    return [];
  }
}

export default async function WorkshopsPage() {
  const workshops = await fetchWorkshops();
  return <WorkshopCatalog workshops={workshops} />;
}

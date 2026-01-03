import { getAllLabs, getFeaturedLab, getFocusAreas, getDifficulties } from '@/lib/homelabs';
import HomelabsClient from '@/components/pages/HomelabsClient';

export default function HomelabsSection() {
  const labs = getAllLabs();
  const featured = getFeaturedLab();
  const focusAreas = getFocusAreas();
  const difficulties = getDifficulties();

  return (
    <HomelabsClient
      labs={labs}
      featured={featured}
      focusAreas={focusAreas}
      difficulties={difficulties}
    />
  );
}

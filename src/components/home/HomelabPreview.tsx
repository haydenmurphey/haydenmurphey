import { getRecentLabs } from '@/lib/homelabs';
import HomelabPreviewClient from '@/components/home/HomelabPreviewClient';

export default function HomelabPreview() {
  const labs = getRecentLabs(3);
  return <HomelabPreviewClient labs={labs} />;
}

import { Metadata } from 'next';
import { DemoClient } from './DemoClient';

export const metadata: Metadata = {
  title: 'I Am Demo | TMS',
  description: 'Reference module proving the feature flag system end to end.',
};

export default function DemoPage() {
  return <DemoClient />;
}

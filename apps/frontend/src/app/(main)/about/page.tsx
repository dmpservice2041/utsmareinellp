import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
    title: 'About Us | UTS Marine LLP',
    description: 'Learn about UTS Marine LLP, a leading exporter and stockist of marine ship spare parts with over 10 years of experience. ISO 9001 certified and IMPA member.',
};

export default function AboutPage() {
    return <AboutContent />;
}

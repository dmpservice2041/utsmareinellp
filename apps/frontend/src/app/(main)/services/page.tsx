import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
    title: 'Marine Services & NDT Testing | UTS Marine LLP',
    description: 'Comprehensive marine services including Non-Destructive Testing (MPI, UT), hardness testing, hydraulic pressure testing, and calibration services.',
};

export default function ServicesPage() {
    return <ServicesContent />;
}

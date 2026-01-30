import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marine Oil Purifiers - Alfa Laval, Mitsubishi, Westfalia | UTS Marine LLP',
    description: 'High-quality reconditioned oil purifiers for Lubricating Oil (LO) and Fuel Oil (FO). Stocking Alfa Laval, Mitsubishi, and Westfalia units for marine and power plant applications.',
    keywords: 'oil purifiers, marine oil purifier, Alfa Laval purifier, Mitsubishi purifier, Westfalia purifier, lube oil purifier, fuel oil purifier, marine separation systems',
    openGraph: {
        title: 'Marine Oil Purifiers | UTS Marine LLP',
        description: 'Premium reconditioned oil purifiers for marine and industrial use',
        type: 'website',
    },
};

export default function OilPurifiersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

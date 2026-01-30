import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Two Stroke Engine Parts - MAN B&W L45GFCA, K98MC, Sulzer RTA | UTS Marine LLP',
    description: 'Genuine spare parts for MAN B&W (L45GFCA, L55GFCA, L67GFCA, L80GFCA, K98MC-C, S50MC-C, S60MC-C), Sulzer RTA, and Mitsubishi UEC two-stroke marine diesel engines. Global shipping available.',
    keywords: 'MAN B&W L45GFCA, MAN B&W L55GFCA, MAN B&W K98MC, Sulzer RTA48, Mitsubishi UEC, two stroke engine parts, marine diesel engine spares',
    openGraph: {
        title: 'Two Stroke Marine Engine Parts | UTS Marine LLP',
        description: 'Premium spare parts for MAN B&W, Sulzer, and Mitsubishi two-stroke engines',
        type: 'website',
    },
};

export default function TwoStrokeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

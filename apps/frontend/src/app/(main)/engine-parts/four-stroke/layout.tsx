import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Four Stroke Engine Parts - Yanmar, Daihatsu, MaK, MAN B&W | UTS Marine LLP',
    description: 'Genuine spare parts for four-stroke marine auxiliary engines. Stocking Yanmar (EY, N, T series), Daihatsu (DK, DL, DS), MaK, Wartsila, and MAN B&W (L16/24, L21/31). Global delivery.',
    keywords: 'marine four stroke engine, Yanmar spare parts, Daihatsu diesel engine, MaK engine parts, Wartsila auxiliary engine, MAN B&W four stroke, auxiliary diesel generator, marine generator spares',
    openGraph: {
        title: 'Four Stroke Marine Engine Parts | UTS Marine LLP',
        description: 'Premier supplier of four-stroke marine engine parts for auxiliary power',
        type: 'website',
    },
};

export default function FourStrokeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

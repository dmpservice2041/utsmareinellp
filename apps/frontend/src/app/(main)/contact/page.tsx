import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Contact Us | UTS Marine LLP',
    description: 'Get in touch with UTS Marine LLP for marine spare parts inquiries. Located in Bhavnagar, Gujarat, India. Worldwide shipping available.',
};

export default function ContactPage() {
    return <ContactContent />;
}

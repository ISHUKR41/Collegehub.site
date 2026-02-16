/**
 * Contact Page — Form, FAQ, Office info
 */

import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
    title: 'Contact Us — Get in Touch',
    description: 'Have questions? Contact the CollegeHub team. We are here to help with your learning journey. Reach out via form, email, or social media.',
    openGraph: {
        title: 'Contact CollegeHub — Get in Touch',
        description: 'We are here to help with your learning journey.',
    },
};

export default function ContactPage() {
    return <ContactPageContent />;
}

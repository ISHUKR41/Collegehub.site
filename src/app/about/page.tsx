/**
 * About Page — Mission, Vision, Timeline, Team
 * 
 * Tells the CollegeHub story and builds brand trust.
 * 
 * To extend: Add achievements section, partner logos, press mentions.
 */

import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
    title: 'About Us — Our Mission & Team',
    description: 'Learn about CollegeHub — our mission to make quality education accessible to every student in India. Meet the team behind the platform.',
    openGraph: {
        title: 'About CollegeHub — Our Mission & Team',
        description: 'Making quality education accessible to every student in India.',
    },
};

export default function AboutPage() {
    return <AboutPageContent />;
}

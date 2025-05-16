import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/client';
import { teamMembersQuery } from '@/sanity/lib/queries';

interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
}

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    image: SanityImage | null;
    bio: string;
    order: number;
}

async function getTeamMembers(): Promise<TeamMember[]> {
    return await client.fetch(teamMembersQuery);
}

export default async function About() {
    const teamMembers = await getTeamMembers();

    return (
        <main className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about-hero.jpg"
                        alt="Event Planning Background"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">About Us</h1>
                    <p className="text-xl md:text-2xl">
                        Creating Unforgettable Moments Since 2015
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                Founded in 2015, Events by Jess began with a simple mission: to create
                                unforgettable moments that bring people together. What started as a
                                passion for organizing small gatherings has grown into a full-service
                                event planning company that has touched the lives of countless
                                individuals and families.
                            </p>
                            <p className="text-gray-600">
                                Our journey has been marked by countless smiles, tears of joy, and
                                moments of pure celebration. Each event we plan is a unique story,
                                and we&apos;re honored to be a part of these special moments in people&apos;s
                                lives.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden">
                            <Image
                                src="/story-image.jpg"
                                alt="Our Story"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Creative Vision</h3>
                            <p className="text-gray-600">
                                We bring your vision to life with innovative ideas and attention to
                                detail, ensuring every element of your event is perfectly executed.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Professional Excellence</h3>
                            <p className="text-gray-600">
                                With years of experience and a network of trusted vendors, we deliver
                                excellence in every aspect of event planning and execution.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Personal Touch</h3>
                            <p className="text-gray-600">
                                We believe in building personal connections with our clients,
                                understanding their needs, and creating events that reflect their
                                unique style and personality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-primary">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member: TeamMember) => (
                            <div key={member._id} className="text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                                    <Image
                                        src={member.image ? urlFor(member.image).url() : '/placeholder.jpg'}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-primary-dark">{member.name}</h3>
                                <p className="text-gray-600 mb-2">{member.role}</p>
                                <p className="text-gray-500">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-secondary text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Planning Your Event?</h2>
                    <p className="text-xl mb-8">
                        Let&apos;s create something extraordinary together.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-secondary px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
} 
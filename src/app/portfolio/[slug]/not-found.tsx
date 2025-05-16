import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="pt-20">
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">Event Not Found</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Sorry, we couldn't find the event you're looking for.
                </p>
                <div className="space-x-4">
                    <Link
                        href="/portfolio"
                        className="inline-block bg-secondary text-white px-8 py-3 rounded-full hover:bg-secondary-dark transition-colors"
                    >
                        View All Events
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-secondary border border-secondary px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </main>
    );
} 
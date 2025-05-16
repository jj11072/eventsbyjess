'use client';

import { useState } from 'react';
import { client } from '@/sanity/lib/client';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const doc = {
                _type: 'contact',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                eventType: formData.eventType,
                message: formData.message,
                submittedAt: new Date().toISOString(),
                status: 'new',
            };

            await client.create(doc);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage('Failed to submit form. Please try again.');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <main className="pt-20">
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Contact Us</h1>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        Let's discuss your event and create something extraordinary together.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-primary-light">
                            {status === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-primary">Thank You!</h3>
                                    <p className="text-gray-600">
                                        Your message has been sent successfully. We'll get back to you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {status === 'error' && (
                                        <div className="bg-red-50 text-red-500 p-4 rounded-md">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-primary-dark mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-primary-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-primary-dark mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-primary-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-primary-dark mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-primary-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="eventType" className="block text-sm font-medium text-primary-dark mb-1">
                                            Event Type
                                        </label>
                                        <select
                                            id="eventType"
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-primary-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                        >
                                            <option value="">Select an event type</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="social">Social Event</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-primary-dark mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-2 border border-primary-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-secondary text-white py-3 px-6 rounded-md hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary">Get in Touch</h2>
                                <p className="text-gray-600">
                                    We'd love to hear about your event and help make it a success. Fill out the form
                                    or contact us directly using the information below.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <svg
                                        className="w-6 h-6 text-secondary mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-primary-dark">Email</h3>
                                        <p className="text-gray-600">info@eventsbyjess.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <svg
                                        className="w-6 h-6 text-secondary mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-primary-dark">Phone</h3>
                                        <p className="text-gray-600">(555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <svg
                                        className="w-6 h-6 text-secondary mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-primary-dark">Location</h3>
                                        <p className="text-gray-600">Your City, State</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h3 className="font-semibold mb-4 text-primary-dark">Business Hours</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                                    <li>Saturday: 10:00 AM - 4:00 PM</li>
                                    <li>Sunday: Closed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 
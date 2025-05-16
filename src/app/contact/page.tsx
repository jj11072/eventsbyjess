'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { contactInfoQuery } from '@/sanity/lib/queries';

interface ContactInfo {
    _id: string;
    title: string;
    content: string;
    icon: string;
    order: number;
}

export default function Contact() {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchContactInfo() {
            try {
                const info = await client.fetch(contactInfoQuery);
                setContactInfo(info);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        }
        fetchContactInfo();
    }, []);

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
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary opacity-90"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl md:text-2xl">
                        Let&apos;s Start Planning Your Perfect Event
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
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
                                        Your message has been sent successfully. We&apos;ll get back to you soon.
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
                                    We&apos;d love to hear about your event and help make it a success. Fill out the form
                                    or contact us directly using the information below.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((info: ContactInfo) => (
                                    <div key={info._id} className="flex items-start space-x-4">
                                        <div className="text-primary text-2xl">
                                            <i className={info.icon}></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary-dark mb-2">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-600">{info.content}</p>
                                        </div>
                                    </div>
                                ))}
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

            {/* Map Section */}
            <section className="h-[400px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </main>
    );
} 
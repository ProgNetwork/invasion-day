import React from 'react';
import Button from './ui/Button';

const CtaSection: React.FC = () => (
    <section className="bg-secondary-100">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Join the Movement</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-700">
                The time for Treaty is now. Together, we can build a national movement of First Nations people and allies standing side-by-side for truth-telling, Treaties and justice.
            </p>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
                <Button variant="primary" size="lg">Sign the Petition</Button>
                <Button variant="outline" size="lg">Learn More</Button>
                <Button variant="outline" size="lg">Contact Us</Button>
            </div>
        </div>
    </section>
);

export default CtaSection; 
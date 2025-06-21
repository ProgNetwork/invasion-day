import React from 'react';

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    side: 'left' | 'right';
}

const events: TimelineEvent[] = [
    { year: '1', title: 'Early Resistance', description: "From the moment of colonisation, First Nations peoples have resisted dispossession and fought for their sovereignty. Leaders like Pemulwuy, Windradyne, and Jandamara led armed resistance against colonial forces. Despite overwhelming odds, First Nations peoples never ceded sovereignty and maintained their connection to Country.", side: 'left' },
    { year: '2', title: 'Bark Petitions (1963)', description: "The Yolngu people of Yirrkala in the Northern Territory sent bark petitions to the Australian Parliament, protesting the taking of their land for bauxite mining without consultation. These historic documents combined traditional bark painting with typed text, symbolizing the meeting of two legal systems.", side: 'right' },
    { year: '3', title: 'Barunga Statement (1988)', description: 'The Barunga Statement called for Aboriginal self-management, a national system of land rights, compensation for loss of lands, respect for Aboriginal identity and an end to discrimination. Prime Minister Bob Hawke promised a treaty by 1990, but this promise was not fulfilled.', side: 'left'},
    { year: '4', title: 'Uluru Statement from the Heart (2017)', description: "After extensive consultations with First Nations communities across Australia, the Uluru Statement called for Voice, Treaty, and Truth. This landmark document provides a roadmap for meaningful constitutional reform.", side: 'right'},
    { year: '5', title: 'State-Based Treaty Processes', description: "Victoria established the First Peoples' Assembly to work toward Treaty, while the Northern Territory signed the Barunga Agreement to begin treaty negotiations. Queensland, South Australia, and Tasmania have also taken steps toward Treaty processes, showing growing momentum across the country.", side: 'left'},
    { year: '6', title: 'Together for Treaty Campaign (Present)', description: "Building on decades of advocacy by our communities, Common Threads is growing a community campaign, bringing together diverse voices to strengthen public support for Treaties with First Nations peoples. Through education, community organizing, and political advocacy, we're building unstoppable momentum for Treaties across the continent.", side: 'right'}
];

const Timeline: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">The Journey to Treaty</h2>
                </div>
                <div className="relative">
                    {/* The vertical line */}
                    <div className="absolute left-1/2 top-0 h-full w-0.5 bg-secondary-200 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <div key={index} className="flex justify-between items-start w-full">
                                {/* Left side */}
                                <div className="w-5/12">
                                    {event.side === 'left' && (
                                        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Center dot */}
                                <div className="z-10 bg-secondary-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                                    {event.year}
                                </div>

                                {/* Right side */}
                                <div className="w-5/12">
                                    {event.side === 'right' && (
                                        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline; 
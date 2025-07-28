import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import React from 'react';

const Faq: React.FC = () => {
  const faqs = [
    {
      q: 'What is a Treaty?',
      a: (
        <p>
          A Treaty is a formal agreement between sovereign entities. In the context of First Nations peoples and the Australian government, Treaties would recognize the sovereignty of First Nations peoples and establish frameworks for addressing historical injustices, protecting rights, and creating pathways for self-determination. There are currently processes underway to explore Treaty negotiations at a local, state and national level.
        </p>
      ),
    },
    {
      q: "Why hasn't Australia signed Treaties with First Nations peoples?",
      a: (
        <p>
          Unlike other British colonies such as New Zealand and parts of North America, the British colonizers of Australia relied on the legal fiction of terra nullius (land belonging to no one) to justify settlement without Treaties. This doctrine was overturned by the High Court in the 1992 Mabo decision, but Australia has yet to address this historical omission.  First Nations people have never ceded sovereignty and continue to fight for Treaties and justice.
        </p>
      ),
    },
    {
      q: 'How would Treaties benefit First Nations communities?',
      a: (
        <p>
          We’re all better off when we are free to set our own course and make decisions for ourselves, our families and our communities. But too often, successive Governments have forced their own ideas on how we, as First Nations people, should lead our own lives. Decisions about our health, our education and our homelands keep being taken away from us. Treaty is about putting First Nations people in the driver’s seat so together we can make the decisions that affect us. We know our communities best - so when we have a say over policies that impact us, they work better for us.
        </p>
      ),
    },
    {
      q: 'How would Treaties benefit all Australians?',
      a: (
        <p>
          Treaties would provide a foundation for reconciliation, healing, and justice. They would help address the ongoing impacts of colonization, reduce inequality, protect cultural heritage that enriches all our lives, and create a more honest and mature national identity based on truth and mutual respect. Just as New Zealand has embraced Māori culture, we can create a future where we respect and value Aboriginal people and take pride in the oldest living culture in the world.
        </p>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} title={faq.q}>
                {faq.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;

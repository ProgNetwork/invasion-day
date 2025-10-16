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
    {
      q: 'What is the Truth-telling and Treaty process in Victoria?',
      a: (
        <div>
          <p className="mb-4">
            <strong>Yoorrook truth-telling process:</strong> The Yoorrook Justice Commission has led a groundbreaking truth-telling process in Victoria: listening to the experiences of First Nations people and charting a course forward for action, healing and justice. After more than four years and over 1,300 submissions, the final report was handed down in July 2025. It includes 100 recommendations to address ongoing and systemic injustices across areas such as health, education, land rights and representation.
          </p>
          <p className="mb-4">
            We can only be our best and create a country where everyone can thrive when we listen and acknowledge the truth of our past and present. We must speak the truth about Australia's history regarding Aboriginal people — including massacres, dispossession, and the violent suppression of language and culture — and understand how these systems continue today. Through truth-telling, we can honour the strength and survival of First Nations peoples and build a more just future together.
          </p>
          <p>
            <strong>Statewide Treaty process:</strong> Right now, the First Peoples' Assembly - an elected body representing First Peoples across Victoria - is negotiating a statewide Treaty with the Victorian government. This Treaty can make sure Aboriginal communities have the freedom and power to set the course and design solutions that work for their mob across a range of areas - like removing unfair barriers to healthcare and housing, making sure young people can thrive, and making sure all Victorians can learn about and celebrate First Nations cultures.
          </p>
          <p>
            The Victorian Treaty legislation is set to be tabled in Parliament before the end of 2025.
          </p>
        </div>
      ),
    },
    {
      q: 'What about Treaties in other states?',
      a: (
        <ul className="space-y-2">
          <li><strong>NSW:</strong> Committed to a 12-month consultation process in 2023 with discussions beginning in the coming months.</li>
          <li><strong>Queensland:</strong> A Path to Treaty process which began under Labor in 2019 was scrapped in 2024 by the incoming Liberal National Party.</li>
          <li><strong>South Australia:</strong> Aboriginal leaders are keen for discussions to restart but the state government has said no treaty will be negotiated before the next state election in March 2026. South Australia has the first state-based voice which was legislated in 2023.</li>
          <li><strong>Tasmania:</strong> The Tasmanian government has committed to a truth-telling process, but has dropped Treaty discussions.</li>
          <li><strong>Northern Territory:</strong> The Country Liberal Party (CLP) government scrapped the treaty process in February 2025.</li>
          <li><strong>Western Australia:</strong> Has made no formal commitments.</li>
          <li><strong>ACT:</strong> In early 2023, the ACT Government announced it would set up an Aboriginal and Torres Strait Island Eminent Panel. While it was anticipated that this would be established by late 2023, no progress has been seen.</li>
        </ul>
      ),
    }
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

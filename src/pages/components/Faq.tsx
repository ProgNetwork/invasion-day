import React from "react";
import Accordion, { AccordionItem } from "./ui/Accordion";

const Faq: React.FC = () => {
  const faqs = [
    {
      q: "What is a Treaty?",
      a: (
        <p>
          A Treaty is a formal agreement between sovereign entities. In the context of First Nations peoples and the
          Australian government, Treaties would recognise the sovereignty of First Nations peoples and establish a
          framework for addressing historical injustices, protecting rights, and clearing pathways for
          self-determination.
        </p>
      ),
    },
    {
      q: "Why hasn't Australia signed Treaties with First Nations peoples?",
      a: (
        <p>
          Unlike other British colonies such as New Zealand and parts of North America, the British colonisers of
          Australia relied on the legal fiction of terra nullius (land belonging to no one) to justify settlement
          without Treaties. This doctrine was overturned by the High Court in the 1992 Mabo decision, but Australia had
          yet to address this historical omission.
        </p>
      ),
    },
    {
      q: "How would Treaties benefit all Australians?",
      a: (
        <p>
          Treaties would provide a foundation for reconciliation, healing, and justice. They would help address the
          ongoing impacts of colonialism, reduce inequality, protect cultural heritage that enriches all Australians,
          and create a more honest and mature national identity based on truth and mutual respect.
        </p>
      ),
    },
    {
      q: "Who is coordinating this campaign?",
      a: (
        <p>
          The Together for Treaty campaign is led by Common Threads, a new First Nations-led organisation working to
          harness the power of First Nations leadership, advocacy and change-making to drive transformative change. We
          are forging a new pathway to build Indigenous power and drive systemic change that centres the aspirations of
          our people - for country, for community and for our rights. You can{" "}
          <a href="#" className="text-primary-600 hover:text-primary-700 underline">
            read more about Common Threads here.
          </a>
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

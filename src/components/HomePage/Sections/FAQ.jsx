import React from 'react';

const faqs = [
  {
    question: "Is the food safety guaranteed?",
    answer: "We provide guidelines for all donors to follow. However, as a peer-to-peer platform, we recommend users check food quality upon pickup."
  },
  {
    question: "How do I become a donor?",
    answer: "Simply create an account, go to your dashboard, and click 'Add Food'. It takes less than a minute!"
  },
  {
    question: "Is there any cost involved?",
    answer: "No, PlateShare is completely free to use for both donors and recipients. Our goal is to reduce waste and help others."
  },
  {
    question: "Can I request specific food items?",
    answer: "Currently, you can browse available listings. If you need something specific, you can join our community forums or groups."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base font-bold text-primary tracking-widest uppercase mb-3">Support</h2>
            <h3 className="text-4xl md:text-5xl font-black">Common Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="collapse collapse-plus bg-base-200 rounded-2xl border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked={i === 0} /> 
                <div className="collapse-title text-xl font-bold p-6">
                  {f.question}
                </div>
                <div className="collapse-content px-6 pb-6 text-base-content/70 font-medium"> 
                  <p>{f.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import { useState } from "react";
import { HelpCircle, MessageCircle, Mail, Book, ChevronDown, ChevronUp, Search, ExternalLink } from "lucide-react";

const faqs = [
  {
    question: "How do I earn money on Chella?",
    answer: "You can earn money by completing daily tasks, referring new users to the platform, and checking in daily for rewards. The more active you are, the more you can earn!"
  },
  {
    question: "How does the referral system work?",
    answer: "Share your unique referral code with friends. When they sign up and complete tasks, you earn a percentage of their earnings. The more referrals you have, the more you can earn!"
  },
  {
    question: "What are daily tasks?",
    answer: "Daily tasks are activities that refresh every day. Complete them to earn rewards. Check back each day for new opportunities to earn."
  },
  {
    question: "How do I withdraw my earnings?",
    answer: "Go to the Transactions page and look for the withdrawal option. You can transfer your balance to your connected bank account or other payment methods."
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes! We take data privacy seriously. Your personal information is encrypted and stored securely. We never share your data with third parties without your consent."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team through the contact form below, email us at support@chella.com, or use the live chat feature. We're here to help 24/7!"
  }
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <HelpCircle className="text-yellow-500" size={36} />
          Help Center
        </h1>
        <p className="text-gray-400 mt-2">Find answers to common questions or contact our support team</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-gray-700 transition-colors text-left">
          <MessageCircle className="text-yellow-500 mb-3" size={28} />
          <h3 className="text-white font-semibold">Live Chat</h3>
          <p className="text-gray-400 text-sm mt-1">Chat with our support team</p>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-gray-700 transition-colors text-left">
          <Mail className="text-yellow-500 mb-3" size={28} />
          <h3 className="text-white font-semibold">Email Support</h3>
          <p className="text-gray-400 text-sm mt-1">Get help via email</p>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-gray-700 transition-colors text-left">
          <Book className="text-yellow-500 mb-3" size={28} />
          <h3 className="text-white font-semibold">Documentation</h3>
          <p className="text-gray-400 text-sm mt-1">Read our guides</p>
        </button>
      </div>

      {/* FAQs */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openFaq === index ? <ChevronUp className="text-yellow-500" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
              </button>
              {openFaq === index && (
                <div className="px-4 py-3 bg-gray-700/30">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
        <p className="text-gray-400 mb-4">Can't find what you're looking for? Send us a message!</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm">Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Message</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-32"
              placeholder="How can we help you?"
            />
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
            <Mail size={20} />
            Send Message
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Also check out our{" "}
          <a href="#" className="text-yellow-500 hover:underline flex items-center justify-center gap-1">
            Terms of Service <ExternalLink size={14} />
          </a>
        </p>
      </div>
    </div>
  );
}


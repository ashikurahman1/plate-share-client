import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black italic mb-4">Get in <span className="text-primary italic tracking-tighter">Touch .</span></h1>
            <p className="text-base-content/60 text-lg font-medium">Have questions or want to partner with us? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-base-100 p-8 md:p-12 rounded-[3rem] shadow-xl border border-base-200">
                <h3 className="text-2xl font-black mb-10 italic">Contact Info</h3>
                <div className="space-y-10">
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <FaPhone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">Call us</p>
                      <p className="text-xl font-black">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <FaEnvelope size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">Email us</p>
                      <p className="text-xl font-black">hello@plateshare.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">Visit us</p>
                      <p className="text-xl font-black">123 Share St, Community Hub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-7">
              <div className="bg-base-100 p-8 md:p-16 rounded-[3rem] shadow-2xl border border-base-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold">Full Name</span></label>
                      <input type="text" placeholder="John Doe" className="input input-bordered h-14 rounded-2xl bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold">Email Address</span></label>
                      <input type="email" placeholder="john@example.com" className="input input-bordered h-14 rounded-2xl bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Subject</span></label>
                    <input type="text" placeholder="How can we help?" className="input input-bordered h-14 rounded-2xl bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Message</span></label>
                    <textarea rows={5} placeholder="Write your message here..." className="textarea textarea-bordered rounded-[2rem] bg-base-200/30 border-none focus:ring-2 focus:ring-primary/20 p-6" />
                  </div>
                  <button className="btn btn-primary btn-lg w-full rounded-2xl text-white font-black gap-3 shadow-xl shadow-primary/30">
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

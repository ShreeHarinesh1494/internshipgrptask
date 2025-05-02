import BoxReveal from '@/components/magicui/box-reveal';
import GradualSpacing from '@/components/magicui/gradual-spacing';
import LetterPullup from '@/components/magicui/letter-pullup';
import ShineBorder from '@/components/magicui/shine-border';
import { MarqueeDemo } from '@/components/MarqueeDemo';
import { SectionIcon, ShieldPlus } from 'lucide-react';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/contact', formData);
      toast.success('Form submitted successfully!');
      setFormData({
        name: '',
        contact: '',
        email: '',
      });
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        
        <section className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-20">
          <div className="container mx-auto px-6 text-center">
            <LetterPullup
              words="Unlock Real-Time Insights from Your IoT Devices"
              delay={0.05}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white"
            />
            <p className="text-lg mb-8">
              Analyze, monitor, and visualize your device data like never before with Iotz.
            </p>
            <a href="#contact" className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--secondary))] transition">
              Request a Demo
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center">
                  <SectionIcon className="h-10 w-10 mr-2" />
                  <GradualSpacing
                    className="text-4xl font-bold tracking-[-0.1em]"
                    text="Iotz"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-9">
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <div className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 rounded-lg shadow-lg text-center border border-black dark:border-white">
                    <p className="text-lg">
                      Iotz empowers organizations to make data-driven decisions through real-time IoT data analytics and monitoring.
                    </p>
                  </div>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <div className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 rounded-lg shadow-lg text-center border border-black dark:border-white">
                    <p className="text-lg">
                      We bring intelligence to your devices by transforming raw sensor data into meaningful dashboards and alerts.
                    </p>
                  </div>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <div className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 rounded-lg shadow-lg text-center border border-black dark:border-white">
                    <p className="text-lg">
                      Whether you're in manufacturing, logistics, or healthcare, Iotz helps you monitor, analyze, and optimize device performance.
                    </p>
                  </div>
                </BoxReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Iotz?</h2>
              <p className="text-lg">
                Discover the power of intelligent IoT analytics for your business.
              </p>
            </div>
            <div className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-8 rounded-lg shadow-lg border border-black dark:border-white">
              <div className="flex flex-col space-y-5">
                <div className="flex items-start space-x-4">
                  <SectionIcon className="h-12 w-12 text-indigo-600" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-Time Monitoring</h3>
                    <p className="text-lg">
                      Gain instant access to data from all your connected devices and receive alerts the moment something unusual occurs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <SectionIcon className="h-12 w-12 text-green-600" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Custom Dashboards</h3>
                    <p className="text-lg">
                      Visualize your data the way you want. Create interactive dashboards tailored to your team's needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <SectionIcon className="h-12 w-12 text-red-600" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Scalable Architecture</h3>
                    <p className="text-lg">
                      Iotz is designed to grow with your business, handling thousands of devices and millions of datapoints with ease.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
            <MarqueeDemo />
          </div>
        </section>

        <section id="contact-form" className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-8 rounded-lg shadow-lg border border-black dark:border-white">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-black dark:border-white rounded-lg" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-lg font-semibold mb-2">Contact No</label>
                <input 
                  type="tel" 
                  id="contact" 
                  name="contact" 
                  required 
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-2 border border-black dark:border-white rounded-lg" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-black dark:border-white rounded-lg" 
                />
              </div>
              <button type="submit" className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] transition w-full">
                Submit
              </button>
            </form>
          </div>
        </section>
        
        <section id="contact" className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Monitoring Your IoT Devices Today
            </h2>
            <p className="text-lg mb-8">
              Reach out to us for a personalized walkthrough of the Iotz platform.
            </p>
            <a href="mailto:support@iotzplatform.com" className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--secondary))] transition">
              Contact Us
            </a>
          </div>
        </section>

        <ToastContainer />
      </div>
    </>
  );
}

export default Home;

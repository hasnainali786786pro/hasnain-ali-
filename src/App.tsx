import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Menu, 
  X, 
  ChevronRight, 
  HeartPulse, 
  Sparkles, 
  Activity, 
  Grid, 
  Gem, 
  ShieldCheck, 
  Eraser, 
  Smile, 
  Image as ImageIcon, 
  Bell as AlarmBell, 
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Map as MapIcon,
  Sun,
  Moon,
} from 'lucide-react';
import { CLINIC_INFO, SERVICES, WHY_CHOOSE_US } from './constants';

// Clinic Coordinates from Google Maps Link
const CLINIC_COORDINATES = { lat: 33.7179336, lng: 73.0540505 };
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Dr.+Syed+Ilyas+Jan+-+Dental+Surgeon/@33.7179336,73.0540505,17z";

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants = {
    primary: 'bg-gradient-red text-white hover:shadow-lg hover:shadow-red-500/30 font-medium',
    secondary: 'bg-white dark:bg-slate-800 text-red-600 border border-red-100 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-slate-700 font-medium',
    outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-red-600 font-semibold',
  };
  
  return (
    <button 
      className={`px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-teal-600 font-semibold tracking-wider uppercase text-sm block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "80px" }}
      viewport={{ once: true }}
      className={`h-1.5 bg-gradient-premium rounded-full mt-6 ${centered ? 'mx-auto' : ''}`}
    />
  </div>
);

// --- Section Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'top-0 bg-white dark:bg-slate-950/90 dark:backdrop-blur-md shadow-md py-4' : 'top-6 bg-transparent py-0'}`}>
      <div className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? '' : 'bg-white/5 backdrop-blur-md rounded-3xl py-4 border border-white/10 shadow-2xl shadow-teal-950/20'}`}>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transform rotate-3 transition-all duration-500 group-hover:rotate-12 ${scrolled ? 'bg-teal-600 text-white' : 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400'}`}>
            <HeartPulse size={26} className="fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight leading-none">
              <span className="text-white">DR. </span>
              <span className="text-red-600">SYED ILYAS JAN</span>
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] font-sans uppercase mt-1 text-red-500">
              Dental Surgeon
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-medium transition-colors hover:text-teal-500 ${scrolled ? 'text-gray-700 dark:text-slate-300' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Button variant={scrolled ? 'primary' : 'outline'} className="px-6 py-2.5 text-sm">
            Book Appointment
          </Button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className={scrolled ? 'dark:text-white text-gray-900' : 'text-white'} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white dark:bg-slate-950 z-[60] p-8 flex flex-col md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={32} className="text-gray-900 dark:text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-display font-medium text-gray-900 dark:text-white" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="w-full mt-4">Book Appointment</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-start pt-48 md:pt-64 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/src/assets/images/dental_hero_banner_1778990021809.png" 
          alt="Premium Dental Clinic" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 via-teal-900/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-10"
          >
            PREMIUM <span className="text-red-500">DENTAL</span> CARE <br />
            <span className="text-teal-300">IN ISLAMABAD</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-teal-50/90 leading-relaxed max-w-xl mb-8"
          >
            Expert Dental Treatments by Dr. Syed Ilyas Jan with Trusted Patient Care and Modern Technology. Your journey to a perfect smile starts here.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 shadow-2xl shadow-black/20"
          >
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-white text-sm font-semibold tracking-wide">5.0 ★ Rating | 333 Happy Patients</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="primary" className="group" onClick={() => document.getElementById('appointment')?.scrollIntoView()}>
              Book Appointment 
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noreferrer">
              <Button variant="outline">
                <MapPin size={18} /> View Location in F-7/1
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full mt-1" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAHMJaViy206VT21yo5esr_6SD54BWZ50O4snN5w6iLlKjbrEmVEoaiXnR-TU3pcrt-LpQK4rjImGcnRWbT9m9pey98LFrauHaZnfp9wzAICTR3_Q82d0woSs4k2nmoLgmuF4LVb=w1200-h1600" 
                alt={CLINIC_INFO.doctor} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Design Accents */}
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 max-w-[240px] border border-transparent dark:border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <Star size={20} className="fill-current" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">15+ Years</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">of Excellence</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                Trusted by 5000+ patients in Islamabad and surrounding areas.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading 
              title="Dedicated to Your Smile's Perfection" 
              subtitle="Meet the Surgeon" 
              centered={false} 
            />
            <p className="text-lg text-gray-600 dark:text-slate-300 mb-8 leading-relaxed">
              Dr. Syed Ilyas Jan is a renowned Dental Surgeon based in Islamabad, specializing in advanced aesthetic and restorative procedures. With years of clinical excellence, he has established himself as a leader in modern dentistry.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                "Dental Implantology Specialist",
                "Esthetic Smile Design",
                "Advanced Root Canal Care",
                "Orthodontic Excellence"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <ChevronRight size={14} />
                  </div>
                  <span className="text-gray-700 dark:text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button>View Full Experience</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      HeartPulse: <HeartPulse />,
      Sparkles: <Sparkles />,
      Activity: <Activity />,
      Grid: <Grid />,
      Gem: <Gem />,
      ShieldCheck: <ShieldCheck />,
      Eraser: <Eraser />,
      Smile: <Smile />,
      Image: <ImageIcon />,
      AlarmBell: <AlarmBell />,
    };
    return icons[iconName] || <Activity />;
  };

  return (
    <section id="services" className="py-24 bg-brand-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading 
          title="World-Class Dental Services" 
          subtitle="Our Expertise" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-teal-50 dark:border-slate-800 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/40 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:bg-gradient-premium group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6 font-sans leading-relaxed">
                {service.description}
              </p>
              <button className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-teal-950 to-teal-800 rounded-[3rem] p-12 md:p-20 overflow-hidden relative shadow-2xl">
          {/* Abstract Bg Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                title="Why Patients Trust Us" 
                subtitle="Excellence in Care" 
                centered={false} 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {WHY_CHOOSE_US.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 text-teal-50"
                  >
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="text-teal-400 mb-6 flex justify-center">
                <Star size={48} className="fill-current" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Patient-Centric Approach</h3>
              <p className="text-teal-50/80 mb-8 leading-relaxed">
                We believe in providing more than just dental treatment. Our clinic offers a sanctuary of comfort combined with unparalleled medical expertise.
              </p>
              <Button variant="outline" className="w-full">Discover Our Philosophy</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Appointment = () => {
  return (
    <section id="appointment" className="py-24 bg-brand-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading 
              title="Book Your Consultation" 
              subtitle="Get Started" 
              centered={false} 
            />
            <p className="text-lg text-gray-600 dark:text-slate-300 mb-10 leading-relaxed">
              Take the first step towards your dream smile. Fill out the form, and our concierge will contact you shortly to confirm your visit.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Phone size={24} />, title: "Quick Response", text: "We confirm within 2 hours" },
                { icon: <Clock size={24} />, title: "Flexible Timing", text: "Evenings and Weekends available" },
                { icon: <MapPin size={24} />, title: "Premium Location", text: "Located in the heart of Islamabad" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-500 dark:text-slate-400 text-sm font-sans">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-teal-50 dark:border-slate-800"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Phone Number</label>
                  <input type="tel" placeholder="+92 000 0000000" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Treatment Type</label>
                <select className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal-500 outline-none transition-all text-gray-500 dark:text-slate-400">
                  <option>Select Service</option>
                  {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Preferred Date</label>
                <input type="date" className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal-500 outline-none transition-all text-gray-500 dark:text-slate-400" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Message Box</label>
                <textarea rows={4} placeholder="Describe your dental concerns..." className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-teal-500 outline-none transition-all dark:text-white"></textarea>
              </div>
              <Button type="button" className="w-full py-4 text-lg">Send Appointment Request</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Ahmed Khan", role: "Business Owner", text: "Dr. Ilyas Jan is truly the best in Islamabad. The implant procedure was completely painless and the result is amazing.", rating: 5 },
    { name: "Sara Malik", role: "Teacher", text: "Compassionate care and extreme professionalism. The clinic environment is very relaxing. Highly recommended!", rating: 5 },
    { name: "Zainab Ali", role: "Artist", text: "I got my smile makeover here. The attention to detail in cosmetic dentistry is unmatched in Pakistan.", rating: 5 },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading 
          title="Patient Success Stories" 
          subtitle="Testimonials" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-50 dark:bg-slate-950 p-8 rounded-[2rem] border border-teal-100 dark:border-slate-800 hover:border-teal-500 transition-colors duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <MessageSquare className="text-teal-200 dark:text-teal-900 mb-6" size={48} />
              <p className="text-gray-700 dark:text-slate-200 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{t.name}</div>
                <div className="text-teal-600 dark:text-teal-400 text-sm">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-brand-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading 
          title="Inside Our Modern Clinic" 
          subtitle="Portfolio & Spaces" 
        />
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[
            { src: "/src/assets/images/dental_hero_banner_1778990021809.png", alt: "Modern Clinic Lab" },
            { src: "/src/assets/images/dental_implants_service_1778990063052.png", alt: "Premium Equipment" },
            { src: "https://picsum.photos/seed/dental1/600/800", alt: "Consultation Room" },
            { src: "https://picsum.photos/seed/dental2/600/500", alt: "Patient Comfort Room" },
            { src: "https://picsum.photos/seed/dental3/600/700", alt: "Advanced Dental Tools" },
            { src: "https://picsum.photos/seed/dental4/600/600", alt: "Smile Gallery" },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden group cursor-pointer relative"
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium">{item.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading 
              title="Get in Touch" 
              subtitle="Contact Details" 
              centered={false} 
            />
            
            <div className="space-y-8 mt-10">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-gradient-premium rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-teal-500/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Our Clinic Location</h4>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{CLINIC_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-gradient-premium rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-teal-500/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Emergency Call</h4>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed font-bold text-lg">{CLINIC_INFO.phone}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-gradient-premium rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-teal-500/20">
                  <Clock size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Working Hours</h4>
                  <div className="space-y-4 bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-inner">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-slate-400 font-medium">Monday - Sunday:</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">Open 24 Hours</span>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                      <h5 className="text-[10px] font-bold text-gray-400/80 uppercase tracking-widest mb-2">Online Service Hours</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 dark:text-slate-400">Sun - Tue & Thu - Sat:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">Open 24 Hours</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 dark:text-slate-400">Wednesday:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">9:00 AM - 5:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-900/40">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700 dark:text-teal-400">Available 24/7 for Dental Emergencies</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-teal-100 dark:border-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 hover:bg-teal-600 hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-teal-100 dark:border-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 hover:bg-teal-600 hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-teal-100 dark:border-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 hover:bg-teal-600 hover:text-white transition-all"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white dark:border-slate-800 transition-colors duration-500">
            <iframe 
              src="https://maps.google.com/maps?q=Dr.%20Syed%20Ilyas%20Jan%20-%20Dental%20Surgeon,%20Islamabad&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              title="Dr. Syed Ilyas Jan Clinic Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-teal-950 pt-24 pb-12 text-teal-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <span className="text-2xl font-display font-bold leading-none block mb-2">
              <span className="text-white">DR. </span>
              <span className="text-red-600">SYED ILYAS JAN</span>
            </span>
            <span className="text-xs font-bold tracking-widest text-red-500 block mb-6 px-1 uppercase">DENTAL SURGEON</span>
            <p className="text-teal-200/60 leading-relaxed mb-6 font-sans">
              Experience the future of dentistry in Islamabad. Excellence in surgical care and prosthetic heart of F-7/1.
            </p>
            <div className="mb-8 space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-teal-400" />
                <span className="text-teal-100/80">Clinic: Open 24/7</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-4 h-4" /> {/* Spacer */}
                <span className="text-teal-100/80">Online: 24/7 (Wed 9AM-5PM)</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-teal-900 bg-teal-800" />)}
              </div>
              <span className="text-xs font-bold font-sans">333+ Success Cases</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6 underline decoration-teal-500 decoration-2 underline-offset-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Surgeon</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Treatments</a></li>
              <li><a href="#appointment" className="hover:text-teal-400 transition-colors">Book Visit</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Connect</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6 underline decoration-teal-500 decoration-2 underline-offset-8">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Dental Implants</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Teeth Whitening</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Root Canal</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Braces & Aligners</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Smile Design</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6 underline decoration-teal-500 decoration-2 underline-offset-8">Subscribe</h4>
            <p className="text-teal-200/60 text-sm mb-6 leading-relaxed">Join our newsletter for oral health tips and exclusive offers.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-teal-900 border-none rounded-l-xl px-4 py-3 w-full text-white placeholder:text-teal-700 outline-none focus:ring-1 focus:ring-teal-500" />
              <button className="bg-gradient-red px-4 rounded-r-xl"><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-teal-900 text-center text-teal-200/40 text-xs">
          <p className="mb-4">© {new Date().getFullYear()} Dr. Syed Ilyas Jan – <span className="text-red-500 font-bold">Dental Surgeon</span>. All rights reserved. | Crafted with Care in Islamabad</p>
          <p className="max-w-2xl mx-auto italic">Medical Disclaimer: The information provided on this website is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of your qualified dental provider.</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href={`https://wa.me/${CLINIC_INFO.whatsapp}`} 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Phone size={28} className="fill-current" />
    </motion.div>
    <span className="absolute right-full mr-4 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-teal-50 dark:border-slate-700">Chat with us on WhatsApp</span>
  </a>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    { q: "Is the clinic open for 24-hour emergencies?", a: "Yes, we provide 24/7 dental emergency services. If you have severe pain or an injury, you can call us anytime at +92 342 2072060." },
    { q: "What should I bring for my first consultation?", a: "Please bring any previous dental records, X-rays (if available), and a list of any medications you are currently taking." },
    { q: "Do you offer financing or installment plans?", a: "Yes, we offer flexible payment options and installment plans for major procedures like dental implants and full-mouth rehabilitations." },
    { q: "How often should I visit for a routine checkup?", a: "We recommend a professional cleaning and checkup every 6 months to maintain optimal oral health and catch potential issues early." },
    { q: "Are dental implants painful?", a: "The procedure is performed under local anesthesia, ensuring you feel no pain. Post-treatment discomfort is typically minimal and managed with mild medication." },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeading 
          title="Common Questions" 
          subtitle="FAQ" 
        />
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-teal-50 dark:border-slate-800 rounded-2xl overflow-hidden bg-brand-50 dark:bg-slate-950 hover:border-teal-200 dark:hover:border-slate-700 transition-colors">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">{faq.q}</span>
                <ChevronRight className={`text-teal-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-teal-100/50 dark:border-slate-800">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="font-sans antialiased overflow-x-hidden selection:bg-teal-100 selection:text-teal-900">
      <div className="bg-white dark:bg-slate-900 transition-colors duration-500 min-h-screen">
        <AnimatePresence>
          {loading && (
            <motion.div 
              key="loader"
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex items-center justify-center flex-col"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-4 border-teal-100 dark:border-teal-900/30 border-t-teal-600 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <HeartPulse className="text-teal-600 animate-pulse" size={32} />
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 font-display font-bold text-xl tracking-widest"
              >
                <span className="text-white">DR. </span>
                <span className="text-red-600">ILYAS JAN</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Appointment />
            <FAQ />
            <Testimonials />
            <Gallery />
            <Contact />
            <Footer />
            <WhatsAppButton />
          </>
        )}
      </div>
    </div>
  );
}

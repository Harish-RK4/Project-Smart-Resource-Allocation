import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Cpu, 
  ArrowRight, 
  Globe, 
  Layers, 
  BarChart3,
  Bot
} from 'lucide-react';

import Hero3D from '../components/Hero3D';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="glass-card p-8 group hover:border-indigo-500/50 transition-all relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const LandingPage = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
            <Zap className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">ResAlloc<span className="text-indigo-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Intelligence', 'Security', 'Enterprise'].map(item => (
            <a key={item} href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <button 
          onClick={onEnterApp}
          className="btn-primary group"
        >
          <span>Launch Dashboard</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <Bot size={14} />
              <span>Next-Gen Resource Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              OPTIMIZE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 animate-gradient">
                EVERYTHING
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              ResAllocAI uses multi-dimensional neural networks to eliminate scheduling conflicts and maximize organizational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onEnterApp}
                className="btn-primary px-8 py-4 text-lg shadow-2xl shadow-indigo-600/20"
              >
                Get Started Now
              </button>
              <button className="btn-secondary px-8 py-4 text-lg">
                View Documentation
              </button>
            </div>
          </motion.div>

          {/* Real 3D Hero Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <Hero3D />
            
            {/* Floating Status Card Overlay */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-0 glass-card p-6 border-indigo-500/50 shadow-indigo-600/40 hidden md:block z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-300 uppercase">AI Neural Load</span>
              </div>
              <div className="text-3xl font-black text-white">ACTIVE</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Manual Time Saved', value: '80%+' },
            { label: 'Resource Utilization', value: '+30%' },
            { label: 'Booking Conflicts', value: 'ZERO' },
            { label: 'Global Users', value: '2M+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">POWERFUL CAPABILITIES</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to orchestrate complex organizations with surgical precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Cpu} 
              title="AI Allocation Engine" 
              description="Proprietary neural networks analyze thousands of constraints per second to find the perfect resource match." 
              delay={0.1}
            />
            <FeatureCard 
              icon={Shield} 
              title="Conflict Immunity" 
              description="Predictive algorithms detect and resolve scheduling overlaps before they even occur in your timeline." 
              delay={0.2}
            />
            <FeatureCard 
              icon={Globe} 
              title="Cross-Dept Logistics" 
              description="Manage humans, machines, vehicles, and cloud resources in a single unified global namespace." 
              delay={0.3}
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Real-time Analytics" 
              description="Live Gantt charts and utilization heatmaps give you a god-mode view of your entire organization." 
              delay={0.4}
            />
            <FeatureCard 
              icon={Layers} 
              title="Scalable Multi-tenancy" 
              description="Enterprise-grade isolation for organizations of any size, from startups to global conglomerates." 
              delay={0.5}
            />
            <FeatureCard 
              icon={Zap} 
              title="Ultra-low Latency" 
              description="Vite-powered frontend and optimized Node.js backend ensure sub-100ms interaction times." 
              delay={0.6}
            />
          </div>
        </div>
        
        {/* Decorative background circle */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full -z-10"></div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">ResAlloc<span className="text-indigo-500">AI</span></span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 ResAllocAI Intelligence. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map(item => (
              <a key={item} href="#" className="text-sm font-medium text-slate-500 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

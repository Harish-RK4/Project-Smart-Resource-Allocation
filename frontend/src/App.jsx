import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Settings,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const KPICard = ({ title, value, change, icon: Icon, color }) => (
  <div className="glass-card p-6 glass-hover group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
      }`}>
        {change}
      </span>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-1 text-white">{value}</p>
  </div>
);

const ResourceStatusGrid = () => {
  const resources = [
    { name: 'Dr. Sarah Wilson', type: 'HUMAN', status: 'AVAILABLE', department: 'Cardiology' },
    { name: 'MRI Unit 1', type: 'MACHINE', status: 'OCCUPIED', department: 'Radiology' },
    { name: 'Operating Room 3', type: 'ROOM', status: 'MAINTENANCE', department: 'Surgery' },
    { name: 'Ambulance V-12', type: 'VEHICLE', status: 'OFFLINE', department: 'Emergency' },
    { name: 'Dr. Michael Chen', type: 'HUMAN', status: 'AVAILABLE', department: 'Pediatrics' },
    { name: 'Ventilator X-09', type: 'MACHINE', status: 'AVAILABLE', department: 'ICU' },
  ];

  const statusColors = {
    AVAILABLE: 'bg-emerald-500',
    OCCUPIED: 'bg-amber-500',
    MAINTENANCE: 'bg-indigo-500',
    OFFLINE: 'bg-slate-500'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((res, i) => (
        <div key={i} className="glass-card p-4 flex items-center gap-4 glass-hover border-l-4 border-l-indigo-500/50">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-white/5">
              {res.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#020617] ${statusColors[res.status]}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">{res.name}</h4>
            <p className="text-xs text-slate-400 uppercase tracking-tight">{res.type} • {res.department}</p>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

import Chatbot from './components/Chatbot';
import NotificationToast from './components/NotificationToast';
import LandingPage from './pages/LandingPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'dashboard'
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', title: 'Potential Conflict', message: 'MRI Unit 1 has overlapping requests for tomorrow.' }
  ]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('dashboard')} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
                <p className="text-slate-400 mt-1">Real-time resource utilization and allocation status.</p>
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary">
                  <Calendar size={18} />
                  <span>Range: Today</span>
                </button>
                <button className="btn-primary" onClick={() => setActiveTab('New Request')}>
                  <Plus size={18} />
                  <span>New Allocation</span>
                </button>
              </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Total Resources" value="124" change="+12%" icon={Package} color="indigo" />
              <KPICard title="Utilization Rate" value="78.4%" change="+5.2%" icon={TrendingUp} color="emerald" />
              <KPICard title="Active Tasks" value="32" change="-2" icon={LayoutDashboard} color="amber" />
              <KPICard title="Conflicts Detected" value="0" change="0" icon={AlertTriangle} color="rose" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Live Resource Status
                  </h2>
                  <button className="text-sm text-indigo-400 font-medium hover:underline">View All</button>
                </div>
                <ResourceStatusGrid />
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-indigo-600/10 to-transparent border-indigo-500/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-400" />
                  AI Insights
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 glass-hover">
                    <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Maintenance Alert</p>
                    <p className="text-sm text-slate-200">MRI Unit 1 is predicted to reach peak capacity in 48h. Schedule maintenance now to avoid downtime.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 glass-hover">
                    <p className="text-xs font-bold text-emerald-400 uppercase mb-1">Utilization Tip</p>
                    <p className="text-sm text-slate-200">Staffing in Pediatrics is 30% underutilized today. Consider reallocating 2 nurses to Emergency.</p>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-indigo-600/20 text-indigo-400 font-semibold text-sm hover:bg-indigo-600/30 transition-all">
                    Run Optimization Engine
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'New Request':
        return (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">New Resource Request</h1>
              <p className="text-slate-400 mt-1">Our AI engine will find the best resource for your needs.</p>
            </div>

            <div className="glass-card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Task Title</label>
                  <input type="text" placeholder="e.g. Project Alpha Kickoff" className="input-field w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Priority</label>
                  <select className="input-field w-full bg-slate-900">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Required Resource Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {['HUMAN', 'MACHINE', 'ROOM', 'VEHICLE', 'VIRTUAL'].map(type => (
                    <button key={type} className="px-3 py-2 rounded-lg border border-white/10 text-xs font-bold hover:bg-indigo-600/20 hover:border-indigo-500/50 transition-all">
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Start Time</label>
                  <input type="datetime-local" className="input-field w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Duration (Hours)</label>
                  <input type="number" placeholder="2" className="input-field w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Description</label>
                <textarea rows={4} className="input-field w-full resize-none" placeholder="Provide details about the task and specific requirements..."></textarea>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="auto" className="w-4 h-4 rounded border-white/10 bg-slate-900 text-indigo-600 focus:ring-indigo-500/50" defaultChecked />
                <label htmlFor="auto" className="text-sm text-slate-300">Enable AI Auto-Allocation</label>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-4">
                <button className="btn-secondary" onClick={() => setActiveTab('Dashboard')}>Cancel</button>
                <button className="btn-primary px-8">Submit Request</button>
              </div>
            </div>
          </div>
        );

      case 'Schedule':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Allocation Schedule</h1>
              <p className="text-slate-400 mt-1">Gantt-style view of all active and pending allocations.</p>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950/30">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-indigo-600 text-xs font-bold">Day</button>
                  <button className="px-3 py-1 rounded hover:bg-white/5 text-xs font-bold text-slate-400">Week</button>
                  <button className="px-3 py-1 rounded hover:bg-white/5 text-xs font-bold text-slate-400">Month</button>
                </div>
                <div className="text-sm font-medium text-slate-300">April 27, 2026</div>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[1000px]">
                  {/* Timeline Header */}
                  <div className="grid grid-cols-12 border-b border-white/5">
                    <div className="col-span-2 p-4 border-r border-white/5 font-bold text-xs text-slate-500 uppercase tracking-widest">Resource</div>
                    {[8, 10, 12, 14, 16, 18, 20, 22].map(hour => (
                      <div key={hour} className="col-span-1 p-4 text-center text-xs font-medium text-slate-500">{hour}:00</div>
                    ))}
                  </div>
                  {/* Timeline Rows */}
                  {[
                    { name: 'Dr. Sarah Wilson', allocations: [{ start: 2, duration: 3, title: 'Surgery Alpha' }] },
                    { name: 'MRI Unit 1', allocations: [{ start: 5, duration: 2, title: 'Scan #129' }] },
                    { name: 'Operating Room 3', allocations: [{ start: 1, duration: 4, title: 'Maintenance' }] },
                    { name: 'Dr. Michael Chen', allocations: [{ start: 3, duration: 2, title: 'Consultation' }] },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <div className="col-span-2 p-4 border-r border-white/5 text-sm font-semibold text-slate-300">{row.name}</div>
                      <div className="col-span-10 relative h-14">
                        {row.allocations.map((alloc, j) => (
                          <div 
                            key={j}
                            className="absolute top-2 h-10 bg-indigo-600/40 border border-indigo-500/50 rounded-lg flex items-center px-3 text-xs font-bold text-white shadow-lg overflow-hidden whitespace-nowrap"
                            style={{ 
                              left: `${(alloc.start / 10) * 100}%`, 
                              width: `${(alloc.duration / 10) * 100}%` 
                            }}
                          >
                            {alloc.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{activeTab}</h2>
              <p className="text-slate-400">This module is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950/50 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">ResAlloc<span className="text-indigo-500">AI</span></span>
          </div>

          <nav className="space-y-2 flex-1">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <SidebarItem icon={Users} label="Resources" active={activeTab === 'Resources'} onClick={() => setActiveTab('Resources')} />
            <SidebarItem icon={Plus} label="New Request" active={activeTab === 'New Request'} onClick={() => setActiveTab('New Request')} />
            <SidebarItem icon={Calendar} label="Schedule" active={activeTab === 'Schedule'} onClick={() => setActiveTab('Schedule')} />
            <SidebarItem icon={TrendingUp} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
            <SidebarItem icon={AlertTriangle} label="Conflicts" active={activeTab === 'Conflicts'} onClick={() => setActiveTab('Conflicts')} />
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <SidebarItem icon={Settings} label="Settings" onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-400">
              <Menu size={24} />
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search resources, tasks..." 
                className="bg-slate-900/50 border border-white/5 rounded-full pl-10 pr-4 py-2 w-80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617]"></span>
            </button>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">Alex Johnson</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Admin Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 border-2 border-white/10 flex items-center justify-center font-bold text-white shadow-lg">
                AJ
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] -z-10 pointer-events-none rounded-full"></div>
      </main>
      <Chatbot />
      
      {/* Notifications Container */}
      <div className="fixed top-24 right-8 z-[110] space-y-4 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence>
            {notifications.map(n => (
              <NotificationToast 
                key={n.id} 
                {...n} 
                onClose={() => removeNotification(n.id)} 
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;

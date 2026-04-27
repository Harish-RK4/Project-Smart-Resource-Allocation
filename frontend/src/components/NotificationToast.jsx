import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationToast = ({ type = 'warning', title, message, onClose }) => {
  const icons = {
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    error: <X className="text-rose-500" size={20} />,
    success: <CheckCircle className="text-emerald-500" size={20} />,
    info: <Info className="text-indigo-500" size={20} />
  };

  const bgColors = {
    warning: 'bg-amber-500/10 border-amber-500/20',
    error: 'bg-rose-500/10 border-rose-500/20',
    success: 'bg-emerald-500/10 border-emerald-500/20',
    info: 'bg-indigo-500/10 border-indigo-500/20'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`glass-card p-4 flex items-start gap-4 min-w-[320px] shadow-2xl border-l-4 ${bgColors[type]}`}
    >
      <div className="mt-1">{icons[type]}</div>
      <div className="flex-1">
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <p className="text-xs text-slate-400 mt-1">{message}</p>
      </div>
      <button onClick={onClose} className="text-slate-500 hover:text-white">
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default NotificationToast;

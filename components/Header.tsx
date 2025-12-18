
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-6 z-30">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-8 bg-primary/10 rounded-lg text-primary">
          <span className="material-symbols-outlined">local_hospital</span>
        </div>
        <h2 className="text-lg font-bold tracking-tight text-text-primary dark:text-white">โรงพยาบาลเทพสตรี</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        
        <button className="flex items-center gap-2 h-9 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-blue-200 dark:shadow-none transition-all">
          <span className="material-symbols-outlined !text-[18px]">add</span>
          <span className="hidden sm:inline">เพิ่มเวร</span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-border-light dark:border-border-dark pl-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium leading-none text-text-primary dark:text-white">ดร. สมศักดิ์</p>
            <p className="text-xs text-text-secondary mt-1">หัวหน้าพยาบาล</p>
          </div>
          <div 
            className="size-9 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBO3qOXGKKirbBqXAVYN-g8HpIt230fMYeMeeEVsRKI-MdT2IHRzAnMHyCBqBE6AUrJDEoFCxI_EvAlrcABjBYEjW0YTMPplj1YsIXJJjuMYFz33FeSXN6w1jjsoaPDvLGT1RSjYbKrKotqd9HdTklumSmCJ7v3LwzcKIXJsRGHuYQPYrvSvBZKGB3uvuKn4Xz8i7FPaZ41TI0sUwIz9L4-8RjBIgi9ih11GPTRuPh5xIQx-7XdVw-9LpkIMSMF4zDPvFe2x7UsCBI")` }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

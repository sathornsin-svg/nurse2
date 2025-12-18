
import React from 'react';
import { Department, MenuTab } from '../types';

interface SidebarProps {
  activeTab: MenuTab;
  setActiveTab: (tab: MenuTab) => void;
  selectedDept: string;
  onDeptChange: (dept: string) => void;
  shiftFilters: Record<string, boolean>;
  onShiftFilterChange: (type: string, checked: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab,
  setActiveTab,
  selectedDept, 
  onDeptChange, 
  shiftFilters, 
  onShiftFilterChange 
}) => {
  const navItems: { label: string; icon: string; id: MenuTab }[] = [
    { label: 'แผงควบคุม', icon: 'dashboard', id: 'dashboard' },
    { label: 'ตารางเวร', icon: 'calendar_month', id: 'schedule' },
    { label: 'บุคลากร', icon: 'group', id: 'staff' },
    { label: 'รายงาน', icon: 'bar_chart', id: 'reports' },
    { label: 'ตั้งค่า', icon: 'settings', id: 'settings' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hidden md:flex flex-col">
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group text-left ${
              activeTab === item.id 
                ? 'bg-primary/10 text-primary' 
                : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === item.id ? 'fill-current' : 'group-hover:text-primary'}`}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Filters Section - Show only on schedule tab */}
      {activeTab === 'schedule' && (
        <div className="p-4 border-t border-border-light dark:border-border-dark">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">ตัวกรอง</p>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-primary dark:text-slate-200">แผนก</label>
              <select 
                value={selectedDept}
                onChange={(e) => onDeptChange(e.target.value)}
                className="form-select w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-slate-800 text-sm text-text-primary dark:text-white focus:border-primary focus:ring-primary"
              >
                <option value="All Departments">ทุกแผนก</option>
                {Object.values(Department).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-primary dark:text-slate-200">ประเภทเวร</label>
              <div className="flex flex-wrap gap-2">
                {['เช้า', 'ดึก', 'หยุด'].map((type) => (
                  <label key={type} className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shiftFilters[type]}
                      onChange={(e) => onShiftFilterChange(type, e.target.checked)}
                      className="rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-slate-800"
                    />
                    <span className="ml-2 text-sm text-text-secondary dark:text-slate-400">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

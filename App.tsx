
import React, { useState, useMemo, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ScheduleGrid from './components/ScheduleGrid';
import { MOCK_STAFF, MOCK_SHIFTS } from './constants';
import { Department, ViewType, MenuTab, Staff, ShiftType, DbConfig } from './types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid
} from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MenuTab>('schedule');
  const [staffList, setStaffList] = useState<Staff[]>(MOCK_STAFF);
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');
  const [viewType, setViewType] = useState<ViewType>('สัปดาห์');
  const [searchQuery, setSearchQuery] = useState('');
  const [shiftFilters, setShiftFilters] = useState<Record<string, boolean>>({
    เช้า: true,
    ดึก: true,
    หยุด: false,
  });

  // DB Config State
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    host: 'localhost',
    port: '3306',
    database: 'hosDB',
    username: 'root',
    password: ''
  });

  // Staff Form State
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffDept, setNewStaffDept] = useState<Department>(Department.GENERAL);
  const [newStaffAvatar, setNewStaffAvatar] = useState<string | undefined>(undefined);
  const [tempUnavailableDates, setTempUnavailableDates] = useState<string>('');
  const [tempUnavailableDays, setTempUnavailableDays] = useState<number[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const weekDates = useMemo(() => {
    const dates = [];
    const baseDate = new Date('2023-10-16T00:00:00');
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  const filteredStaff = useMemo(() => {
    return staffList.filter(staff => {
      const deptMatch = selectedDept === 'All Departments' || staff.department === selectedDept;
      const searchMatch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.department.toLowerCase().includes(searchQuery.toLowerCase());
      return deptMatch && searchMatch;
    });
  }, [staffList, selectedDept, searchQuery]);

  // Statistics Calculation
  const deptData = useMemo(() => {
    const counts: Record<string, number> = {};
    staffList.forEach(s => {
      counts[s.department] = (counts[s.department] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [staffList]);

  const shiftDistributionData = useMemo(() => {
    const counts: Record<string, number> = {
      'เวรเช้า': 0,
      'เวรบ่าย': 0,
      'เวรดึก': 0,
      'ลา': 0,
    };
    MOCK_SHIFTS.forEach(s => {
      if (counts.hasOwnProperty(s.type)) {
        counts[s.type as string]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const staffWorkloadData = useMemo(() => {
    return staffList.slice(0, 5).map(s => {
      const shiftCount = MOCK_SHIFTS.filter(sh => sh.staffId === s.id && sh.type !== ShiftType.OFF).length;
      return {
        name: s.name.replace('พว. ', ''),
        เวร: shiftCount
      };
    });
  }, [staffList]);

  const COLORS = ['#136dec', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleShiftFilterChange = (type: string, checked: boolean) => {
    setShiftFilters(prev => ({ ...prev, [type]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, staffId?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (staffId) {
          setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, avatar: base64String } : s));
        } else {
          setNewStaffAvatar(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName) return;

    const newStaff: Staff = {
      id: Math.random().toString(36).substr(2, 9),
      name: `พว. ${newStaffName}`,
      role: 'พยาบาลวิชาชีพ',
      department: newStaffDept,
      avatar: newStaffAvatar,
      initials: newStaffName.substring(0, 2).toUpperCase(),
      unavailableDates: tempUnavailableDates.split(',').map(d => d.trim()).filter(d => d),
      unavailableDaysOfWeek: tempUnavailableDays,
    };

    setStaffList([...staffList, newStaff]);
    setNewStaffName('');
    setNewStaffAvatar(undefined);
    setTempUnavailableDates('');
    setTempUnavailableDays([]);
    setIsAddingStaff(false);
  };

  const toggleDayOfWeek = (day: number) => {
    setTempUnavailableDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleDbConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig(prev => ({ ...prev, [name]: value }));
  };

  const daysOfWeek = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark text-text-primary dark:text-white">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedDept={selectedDept}
          onDeptChange={setSelectedDept}
          shiftFilters={shiftFilters}
          onShiftFilterChange={handleShiftFilterChange}
        />
        
        <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-hidden">
          {activeTab === 'schedule' ? (
            <>
              {/* Schedule Tab content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-20">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold">ตารางเวร</h1>
                  <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-slate-400">
                    <button className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded p-0.5 transition-colors">
                      <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
                    </button>
                    <span className="font-medium text-text-primary dark:text-slate-200 mx-1">ตุลาคม 2023</span>
                    <button className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded p-0.5 transition-colors">
                      <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined !text-[20px]">search</span>
                    <input 
                      className="w-full pl-10 h-10 rounded-lg border-none bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-text-secondary/70"
                      placeholder="ค้นหารายชื่อพยาบาล..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex h-10 items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                    {(['วัน', 'สัปดาห์', 'เดือน'] as ViewType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setViewType(type)}
                        className={`px-3 h-full rounded-md text-sm font-medium transition-all ${
                          viewType === type 
                            ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white' 
                            : 'text-text-secondary dark:text-slate-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  
                  <button className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined !text-[20px] sm:mr-2">download</span>
                    <span className="hidden sm:inline">ส่งออก</span>
                  </button>
                </div>
              </div>

              <ScheduleGrid 
                staff={filteredStaff}
                shifts={MOCK_SHIFTS}
                dates={weekDates}
              />

              <div className="px-6 py-4 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark flex items-center gap-6 overflow-x-auto text-xs sm:text-sm">
                <span className="font-semibold mr-2 whitespace-nowrap">คำอธิบาย:</span>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="size-3 rounded-full bg-blue-500"></div>
                  <span className="text-text-secondary dark:text-slate-400">เวรเช้า</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="size-3 rounded-full bg-indigo-500"></div>
                  <span className="text-text-secondary dark:text-slate-400">เวรบ่าย</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="size-3 rounded-full bg-slate-700"></div>
                  <span className="text-text-secondary dark:text-slate-400">เวรดึก</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="size-3 rounded-full bg-orange-400"></div>
                  <span className="text-text-secondary dark:text-slate-400">เวรพิเศษ/บางส่วน</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="size-3 rounded-full bg-red-400"></div>
                  <span className="text-text-secondary dark:text-slate-400">ลา</span>
                </div>
              </div>
            </>
          ) : activeTab === 'staff' ? (
            <div className="flex-1 flex flex-col p-6 overflow-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold">จัดการบุคลากร</h1>
                  <p className="text-text-secondary dark:text-slate-400 text-sm mt-1">เพิ่ม แก้ไข และจัดการรูปถ่ายพยาบาลในสังกัด</p>
                </div>
                <button 
                  onClick={() => setIsAddingStaff(true)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
                >
                  <span className="material-symbols-outlined !text-[20px]">person_add</span>
                  <span>เพิ่มพยาบาลใหม่</span>
                </button>
              </div>

              {isAddingStaff && (
                <div className="mb-8 p-6 bg-white dark:bg-surface-dark rounded-xl border-2 border-primary/20 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">add_circle</span>
                    ข้อมูลพยาบาลใหม่
                  </h3>
                  <form onSubmit={handleAddStaff} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="size-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                          {newStaffAvatar ? (
                            <img src={newStaffAvatar} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined !text-[48px] text-slate-400">person</span>
                          )}
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="material-symbols-outlined text-white">photo_camera</span>
                        </div>
                      </div>
                      <p className="mt-3 text-xs font-medium text-text-secondary dark:text-slate-400">คลิกเพื่ออัปโหลดรูป</p>
                      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={(e) => handleImageChange(e)} />
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
                          <input type="text" required value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">แผนก</label>
                          <select value={newStaffDept} onChange={(e) => setNewStaffDept(e.target.value as Department)} className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                            {Object.values(Department).map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">วันที่ไม่สะดวก (1-31)</label>
                          <input type="text" value={tempUnavailableDates} onChange={(e) => setTempUnavailableDates(e.target.value)} className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">วันสัปดาห์ที่ไม่สะดวก</label>
                          <div className="flex flex-wrap gap-1.5">
                            {daysOfWeek.map((day, idx) => (
                              <button key={day} type="button" onClick={() => toggleDayOfWeek(idx)} className={`size-8 rounded-full border text-[10px] font-bold ${tempUnavailableDays.includes(idx) ? 'bg-primary text-white' : 'bg-white text-slate-500'}`}>{day}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 flex justify-end gap-3 pt-4 border-t">
                      <button type="button" onClick={() => setIsAddingStaff(false)} className="px-4 py-2 text-sm">ยกเลิก</button>
                      <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold">บันทึก</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {staffList.map((staff) => (
                  <div key={staff.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark hover:shadow-lg transition-all relative group">
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <div className="size-20 rounded-2xl overflow-hidden border-2 bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                          {staff.avatar ? <img src={staff.avatar} className="w-full h-full object-cover" /> : <span>{staff.initials}</span>}
                        </div>
                        <label className="absolute -bottom-2 -right-2 size-8 bg-white dark:bg-slate-700 rounded-full shadow-lg border flex items-center justify-center cursor-pointer">
                          <span className="material-symbols-outlined !text-[18px]">add_a_photo</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, staff.id)} />
                        </label>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xl truncate">{staff.name}</h4>
                        <p className="text-primary text-xs font-semibold">{staff.department}</p>
                        <div className="mt-4 space-y-2">
                          <p className="text-[10px] font-bold text-slate-500">วันที่ไม่สะดวก: {staff.unavailableDates?.join(', ') || '-'}</p>
                          <p className="text-[10px] font-bold text-slate-500">วันสัปดาห์: {staff.unavailableDaysOfWeek?.map(i => daysOfWeek[i]).join(', ') || '-'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'reports' ? (
            <div className="flex-1 p-6 overflow-auto bg-slate-50 dark:bg-background-dark">
               <h1 className="text-2xl font-bold mb-8">รายงานและสถิติ</h1>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border">
                    <h3 className="font-bold mb-4">สัดส่วนพยาบาลตามแผนก</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={deptData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                            {deptData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border">
                    <h3 className="font-bold mb-4">ประเภทเวร</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={shiftDistributionData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#136dec" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
               </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className="flex-1 p-8 overflow-auto max-w-4xl mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">ตั้งค่าระบบ</h1>
                <p className="text-text-secondary mt-1">กำหนดค่าการเชื่อมต่อฐานข้อมูล MySQL และระบบปฏิบัติการ</p>
              </div>

              <div className="bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">database</span>
                    การเชื่อมต่อ MySQL (hosDB)
                  </h3>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Host / Server</label>
                      <input 
                        type="text" 
                        name="host"
                        value={dbConfig.host}
                        onChange={handleDbConfigChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary"
                        placeholder="localhost"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Port</label>
                      <input 
                        type="text" 
                        name="port"
                        value={dbConfig.port}
                        onChange={handleDbConfigChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary"
                        placeholder="3306"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Database Name</label>
                      <input 
                        type="text" 
                        name="database"
                        value={dbConfig.database}
                        onChange={handleDbConfigChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary"
                        placeholder="hosDB"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Username</label>
                      <input 
                        type="text" 
                        name="username"
                        value={dbConfig.username}
                        onChange={handleDbConfigChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary"
                        placeholder="root"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Password</label>
                      <input 
                        type="password" 
                        name="password"
                        value={dbConfig.password}
                        onChange={handleDbConfigChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                      <span className="material-symbols-outlined !text-[18px]">check_circle</span>
                      <span className="font-medium">สถานะ: จำลองการเชื่อมต่อสำเร็จ</span>
                    </div>
                    <button 
                      className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                      onClick={() => alert('บันทึกการตั้งค่าฐานข้อมูลสำเร็จ (จำลอง)')}
                    >
                      บันทึกการตั้งค่า
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined !text-[20px]">info</span>
                  หมายเหตุสำหรับการเชื่อมต่อ
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                  เนื่องจากแอปพลิเคชันเวอร์ชันนี้เป็น Frontend-only การเชื่อมต่อ MySQL จะต้องทำผ่าน API Backend (เช่น Node.js, PHP หรือ Python) 
                  ค่าที่กรอกด้านบนจะถูกนำไปใช้ในไฟล์ Configuration ของ Backend ของคุณเพื่อให้ระบบสามารถเข้าถึงฐานข้อมูล <b>{dbConfig.database}</b> ได้อย่างถูกต้อง
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-center items-center justify-center p-12 text-slate-400">
              <div className="text-center">
                <span className="material-symbols-outlined !text-[64px] mb-4 block">construction</span>
                <h2 className="text-xl font-bold text-slate-600 dark:text-slate-300">ขออภัย หน้า "{activeTab}" ยังอยู่ระหว่างการพัฒนา</h2>
                <button onClick={() => setActiveTab('schedule')} className="mt-4 text-primary font-bold hover:underline">กลับไปที่ตารางเวร</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;

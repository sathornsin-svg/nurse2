
export enum ShiftType {
  MORNING = 'เวรเช้า',
  AFTERNOON = 'เวรบ่าย',
  NIGHT = 'เวรดึก',
  PARTIAL = 'เวรพิเศษ/บางส่วน',
  LEAVE = 'ลา',
  OFF = 'หยุด'
}

export enum Department {
  ER = 'แผนกฉุกเฉิน (ER)',
  ICU = 'แผนกไอซียู (ICU)',
  PEDIATRICS = 'แผนกกุมารเวชกรรม',
  GENERAL = 'แผนกทั่วไป'
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: Department;
  avatar?: string;
  initials?: string;
  unavailableDates?: string[]; // ISO strings
  unavailableDaysOfWeek?: number[]; // 0-6 (Sun-Sat)
}

export interface Shift {
  id: string;
  staffId: string;
  date: string; // ISO format
  type: ShiftType;
  startTime?: string;
  endTime?: string;
  subType?: string; // e.g., "Sick Leave", "Half Day"
}

export interface DbConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password?: string;
}

export type ViewType = 'วัน' | 'สัปดาห์' | 'เดือน';
export type MenuTab = 'dashboard' | 'schedule' | 'staff' | 'reports' | 'settings';

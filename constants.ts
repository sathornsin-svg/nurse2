
import { Staff, Department, Shift, ShiftType } from './types';

export const MOCK_STAFF: Staff[] = [
  {
    id: '1',
    name: 'พว. อารียา ส.',
    role: 'พยาบาลวิชาชีพ',
    department: Department.ER,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-pr7UtJV-RNFINHIhbl8Bp6yAqEgcVxTfk61qK00TYPo6Eyl0mpmK69I8NuZT4p98T4cz0_WengjE-OghGdUyrNaj-ii1d5R8iHw3PA05yDoyDtpcQPiHb7b5kr4s_ZvO6myoHLkD0JUXozbfesmTdTItJAIq7J0F29Kri9KsvfP9p66GQWZjpusgS4kABFmsYpdusgxmfYjn35XZDs7_iOTdr5Y5MJo_V7nhcYtssKExPvpeNr8yL3GrXa90dFrMBJZAM7VTlt4',
  },
  {
    id: '2',
    name: 'พว. เบญจวรรณ ต.',
    role: 'พยาบาลวิชาชีพ',
    department: Department.ICU,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI-2gisXlNfCYGFLGQtSXnTeJtkR12S3YVukLnfSs3LOL3ilkJajZvKhBaoMxk_I2M9G_z6m4WT4KUWkcbzJnk7-Ktrx8EOReVinyBCSs46tUaLrFp0d-boCRsCKaNahuVcHckqyaKrXBVotywDBrQQ6bS2OAEqaHHVDosTypUwe88zU2kc1CxvrSEDiQAbnxBibCQ-V9yJvHWC65_sXfY4YErICDKoyjWAsuK4UpujG4ZibwhU3bmltF-BVuUi3xBJYGDYmqImO8',
  },
  {
    id: '3',
    name: 'พว. จิตรา ก.',
    role: 'พยาบาลวิชาชีพ',
    department: Department.PEDIATRICS,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeCFgcB_2GBfg9KnoIS0fX8RDJl6Ln8u3Q8lH8IPcIb3dHvqP06I5K0WlS8Qfozg9m1PnZh6bqe6n-f1ISX-TmzpJjoB8Er_Zb89_qN9dX3mrhuTpyUAv95vJ8Mcxacx5InyPfSRnpsbQs9rBZKTXFcD5bGxQp3AfKRql5vKIUz4VmJa8FyjIHybWrZ73Jt77eo1BfD1tZamOzshfYrokMNBApSX9XK_Y5GjO9X24rp1ejnIrfM_fbYHHYQ9WJ4RP54owtFKSm_PM',
  },
  {
    id: '4',
    name: 'พว. ดนัย ท.',
    role: 'พยาบาลวิชาชีพ',
    department: Department.ER,
    initials: 'DT',
  },
  {
    id: '5',
    name: 'พว. เอ็ม เค.',
    role: 'พยาบาลวิชาชีพ',
    department: Department.ER,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5KsNBX7uxzkyhsnR292YH36sBdfXZngHl3-_0PR2rAUBBrJCVlhA6pjzh502wPkAkaOFWS3AceMpPv7IpX--tYkPBUEFsA7LNTzA0EFvk5Hp5Ed5hKbQmV3gpXduhSdxsy0rC994WguithmmBbXNNtoF293d_0p_2lRo8O-Nfx61r-9gBleiCUNdTD4VltMHWLUlFPvsoYaxMB7O8UAy2pNpAhkrOkQrxprPijIC0yQqWfiWM1JV-RFcn2YMTdS3tT_-F1yIAI9c',
  },
];

// Reference Week: Oct 16 - Oct 22, 2023
export const MOCK_SHIFTS: Shift[] = [
  // Areeya S.
  { id: 's1', staffId: '1', date: '2023-10-16', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's2', staffId: '1', date: '2023-10-17', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's3', staffId: '1', date: '2023-10-19', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's4', staffId: '1', date: '2023-10-20', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  // Ben T.
  { id: 's5', staffId: '2', date: '2023-10-16', type: ShiftType.OFF },
  { id: 's6', staffId: '2', date: '2023-10-17', type: ShiftType.NIGHT, startTime: '23:00', endTime: '07:00' },
  { id: 's7', staffId: '2', date: '2023-10-18', type: ShiftType.NIGHT, startTime: '23:00', endTime: '07:00' },
  { id: 's8', staffId: '2', date: '2023-10-19', type: ShiftType.NIGHT, startTime: '23:00', endTime: '07:00' },
  { id: 's9', staffId: '2', date: '2023-10-20', type: ShiftType.OFF },
  { id: 's10', staffId: '2', date: '2023-10-22', type: ShiftType.NIGHT, startTime: '23:00', endTime: '07:00' },
  // Chitra K.
  { id: 's11', staffId: '3', date: '2023-10-16', type: ShiftType.PARTIAL, startTime: '09:00', endTime: '13:00', subType: 'ครึ่งวัน' },
  { id: 's12', staffId: '3', date: '2023-10-17', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's13', staffId: '3', date: '2023-10-18', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's14', staffId: '3', date: '2023-10-20', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's15', staffId: '3', date: '2023-10-22', type: ShiftType.OFF },
  // Danai T.
  { id: 's16', staffId: '4', date: '2023-10-16', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's17', staffId: '4', date: '2023-10-17', type: ShiftType.LEAVE, subType: 'ลาป่วย' },
  { id: 's18', staffId: '4', date: '2023-10-18', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's19', staffId: '4', date: '2023-10-19', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's20', staffId: '4', date: '2023-10-20', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's21', staffId: '4', date: '2023-10-21', type: ShiftType.OFF },
  { id: 's22', staffId: '4', date: '2023-10-22', type: ShiftType.OFF },
  // Em K.
  { id: 's23', staffId: '5', date: '2023-10-16', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's24', staffId: '5', date: '2023-10-17', type: ShiftType.MORNING, startTime: '07:00', endTime: '15:00' },
  { id: 's25', staffId: '5', date: '2023-10-18', type: ShiftType.OFF },
  { id: 's26', staffId: '5', date: '2023-10-19', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's27', staffId: '5', date: '2023-10-20', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's28', staffId: '5', date: '2023-10-21', type: ShiftType.AFTERNOON, startTime: '15:00', endTime: '23:00' },
  { id: 's29', staffId: '5', date: '2023-10-22', type: ShiftType.OFF },
];

export interface AppointmentData {
  _id: string;
  userId: string;
  docId: string;
  appointmentDate: string;
  appointmentTime: string;
  userData: any;
  docData: any;
  price: number;
  date: string;
  cancelled: boolean;
  isPaid: boolean;
  isCompleted: boolean;
}

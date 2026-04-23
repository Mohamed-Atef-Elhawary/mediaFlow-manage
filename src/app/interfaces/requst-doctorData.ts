export interface RequestDoctorData {
  _id: string;
  name: string;
  image: string;

  speciality: string;

  degree: string;

  experience: string;
  about: string;
  consultationFee: number;
  date: string;
  available: boolean;

  address: {
    line1: string;
    line2: string;
  };

  gender: string;
  dateOfBirth: string;
  phone: string;
  appointmentBooked: any;
}

import { Express } from 'express';
import { Multer } from 'multer';

export interface UpdateDoctorData {
  consultationFee: number;
  address: {
    line1: string;
    line2: string;
  };
  available: boolean;
  image?: Express.Multer.File;
}

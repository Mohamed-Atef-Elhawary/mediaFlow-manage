import express from 'express';
import { Multer } from 'multer';
export interface AddDoctorData {
  name: string;
  email: string;
  password: string;
  experience: number;
  consultationFee: number;
  speciality: string;
  degree: string;
  address: { line1: string; line2: string };
  about: string;
  imgFile: Express.Multer.File;
}
// npm install --save-dev @types/express @types/multer
// {
//   "compilerOptions": {
//     "types": ["node", "express", "multer"],
//     // إعدادات أخرى...
//   }
// }

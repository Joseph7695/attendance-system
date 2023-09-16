export interface Student extends Person {}

export interface Teacher extends Person {}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  personType: string;
  attendanceTimes: Date[];
}

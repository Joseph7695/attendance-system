import { Student, Teacher } from './student';

export interface Lesson {
  id: string;
  name: string;
  teachers: Teacher[];
  students: Student[];
}

// export interface Lesson_Student {

// }

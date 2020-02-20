export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export enum Role {
  Teacher = 'teacher',
  Student = 'student',
}
export const ROLES: any = {
  [Role.Teacher]: 'Teacher',
  [Role.Student]: 'Student',
};

type Role = {
  role: string;
  expiration: Date;
};
class User {
  id: string;
  email: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
export { Role, User };

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  email: string;
  homeAddress?: {
    addressLine?: string;
    city?: string;
    zip?: string;
  };
}

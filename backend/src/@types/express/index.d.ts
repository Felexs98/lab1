declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
  }
}

export {};

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    product_id: string;
  }
}

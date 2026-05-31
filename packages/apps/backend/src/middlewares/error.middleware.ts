import type { Request, Response, NextFunction } from "express";

export function errorMiddlewareHandler(err: Error, req: Request, res: Response, next: NextFunction) {
      console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
}
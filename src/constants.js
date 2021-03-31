export const __prod__ = process.env.NODE_ENV === "production";

export const __db__ = __prod__
  ? "https://milo-soft-backend.herokuapp.com"
  : "http://localhost:8000";

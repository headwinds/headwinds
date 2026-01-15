export const getScoutDomain = (): string => {
  if (process.env.NODE_ENV === "production") {
    return "https://scout-222670816692.northamerica-northeast1.run.app";
  } else {
    return "http://localhost:5000";
  }
};

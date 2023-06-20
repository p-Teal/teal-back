const attachCookie = ({ res, token }) => {
  const oneDayToMs = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDayToMs),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export default attachCookie;

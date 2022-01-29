import jwt from "jsonwebtoken";


export const generateJWT = (user: any) => {
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );
  return token;
};

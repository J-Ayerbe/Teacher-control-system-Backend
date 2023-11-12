import jwt from "jsonwebtoken";
import {jwtSecret, jwtSecretRefresh} from "../config/jwtConfig";

interface RenewTokenResult {
  token: string;
  refreshToken: string;
}


export const generateToken = (uid:string,role:string):Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, role };
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(token);
      }
    });
  });
};

export const generateRefreshToken = (uid:string, role:string):Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, role };
    const options = {
      expiresIn: "7d",
    };
    //@ts-ignore
    jwt.sign(payload, jwtSecretRefresh, options, (err, token) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(token);
      }
    });
  });
}
export const renewToken = (refreshToken:string):Promise<RenewTokenResult> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      jwtSecretRefresh,
      async (err, user:any) => {
        if (err) {
          reject("Invalid refresh token");
        } else {
          try {
            const token = await generateToken(user.uid,user.role);
            const refreshToken = await generateRefreshToken(
              user.uid,
              user.role
            );
            resolve({ token, refreshToken });
          } catch (error) {
            reject("Could not generate tokens");
          }
        }
      }
    );
  });
};

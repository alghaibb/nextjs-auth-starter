import prisma from "../lib/prisma";
import crypto, { randomInt } from "crypto";

// Function to generate a 6-digit numeric OTP
const generateNumericOTP = (): string => {
  const otp = randomInt(100000, 999999);
  return otp.toString();
};

// Generate a verification token
export const generateVerificationCode = async (email: string): Promise<string> => {
  const verificationToken = generateNumericOTP();
  const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: verificationToken,
      expires,
    },
  });

  return verificationToken;
};

// Get verification token by email
export const getVerificationTokenByEmail = async (email: string, token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        identifier: email
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}

// Get verification token by token
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}

// Delete the verification token from the database
export const deleteVerificationToken = async (email: string, token: string) => {
  return await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token } },
  });
};

// Generate password reset token 
export const generatePasswordResetToken = async (email: string): Promise<string> => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date().getTime() + 1000 * 60 * 10;

  await prisma.resetPasswordToken.create({
    data: {
      identifier: email,
      token: resetToken,
      expires: new Date(expires),
    },
  });

  return resetToken;
};

// Get password reset token by token
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        token
      }
    })

    return resetPasswordToken;
  } catch (error) {
    console.log(error);
  }
}

// Get password reset token by email
export const getPasswordResetTokenByEmail = async (email: string, token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        token,
        identifier: email
      }
    })

    return resetPasswordToken;
  } catch (error) {
    console.log(error);
  }
}

// Delete the password reset token from the database
export const deletePasswordResetToken = async (email: string, token: string) => {
  return await prisma.resetPasswordToken.delete({
    where: { identifier_token: { identifier: email, token } },
  });
};
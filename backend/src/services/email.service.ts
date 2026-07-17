import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const config: EmailConfig = {
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS || "",
      },
    };

    this.transporter = nodemailer.createTransport(config);
  }

  async sendNGOVerificationEmail(ngoName: string, ngoEmail: string) {
    console.log(`Attempting to send verification email to ${ngoEmail} for ${ngoName}`);
    console.log(`Email config: ${process.env.EMAIL_USER}, host: ${process.env.EMAIL_HOST}`);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"SewaSetu Support" <${process.env.EMAIL_USER}>`,
      to: ngoEmail,
      subject: "Your NGO Account Has Been Verified",
      replyTo: "no-reply@sewasetu.com",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4CAF50;">Your NGO Account Has Been Verified</h2>
          
          <p>Dear <strong>${ngoName}</strong>,</p>
          
          <p>Congratulations! Your NGO account has been successfully verified.</p>
          
          <p>You can now log in to the platform and access all available features.</p>
          
          <p>Thank you for joining our community.</p>
          
          <p>Best regards,<br>
          The Support Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #888;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent successfully to ${ngoEmail}`);
      console.log(`Message ID: ${info.messageId}`);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }

  async sendNGORejectionEmail(ngoName: string, ngoEmail: string, reason?: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"SewaSetu Support" <${process.env.EMAIL_USER}>`,
      to: ngoEmail,
      subject: "Your NGO Account Verification Status",
      replyTo: "no-reply@sewasetu.com",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f44336;">Your NGO Account Verification Status</h2>
          
          <p>Dear <strong>${ngoName}</strong>,</p>
          
          <p>We regret to inform you that your NGO account verification request has been declined.</p>
          
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
          
          <p>If you believe this is an error, please contact our support team.</p>
          
          <p>Best regards,<br>
          The Support Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #888;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Rejection email sent to ${ngoEmail}`);
    } catch (error) {
      console.error("Error sending rejection email:", error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, resetCode: string, name?: string) {
    console.log(`Attempting to send password reset email to ${email}`);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"SewaSetu Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      replyTo: "no-reply@sewasetu.com",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4CAF50;">Password Reset Request</h2>
          
          <p>${name ? `Dear <strong>${name}</strong>,` : "Hello,"}</p>
          
          <p>We received a request to reset your password. Use the following verification code to proceed:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #4CAF50; letter-spacing: 5px;">${resetCode}</span>
          </div>
          
          <p>This code will expire in 15 minutes.</p>
          
          <p>If you did not request this password reset, please ignore this email.</p>
          
          <p>Best regards,<br>
          The SewaSetu Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #888;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Password reset email sent successfully to ${email}`);
      console.log(`Message ID: ${info.messageId}`);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  }
}

export default new EmailService();

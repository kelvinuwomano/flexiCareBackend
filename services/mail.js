const nodemailer = require("nodemailer");
require("dotenv/config");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});


async function verifyEmail(email, token) {
    const verificationLink = `https://flexi-care.vercel.app/api/verify/${token}`

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email from FlexiCare",
        html: `<p>Click the button below to verify your email:</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: white; background: blue; text-decoration: none;">Verify Email</a>
            <p>This link will expire in 1 hour.</p>`
    });
    console.log("An email was sent to :", email)
};

async function verifPharmacyEmail(email, token) {
    const verificationLink = `https://flexi-care.vercel.app/api/pharmacy/verify/${token}`

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email from FlexiCare",
        html: `<p>Click the button below to verify your email:</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: white; background: blue; text-decoration: none;">Verify Email</a>
            <p>This link will expire in 1 hour.</p>`
    });
    console.log("An email was sent to :", email)
};

async function resetEmail(email, token) {
    const resetLink = `http://localhost:5173/api/reset-password/${token}`

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to : email,
        subject: "Password reset Link from FlexiCare",
        html: `<p>Click the link to reset your password:</p>
        ${resetLink}`
    });
    console.log("An email was sent to email:", email)
}

module.exports = {verifyEmail, resetEmail, verifPharmacyEmail}
import sgMail from '@sendgrid/mail';

export const sendEmail = async (email, OTP) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email, // Change to your recipient
        from: 'divyashantkumar000@gmail.com', // Change to your verified sender
        subject: "Your verification OTP",
        text: "Verification OTP",
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;display:flex;justify-content:center;align-items:center;width:100%;overflow:auto;line-height:2; padding:50px 0;">
            <div style=" border:solid grey 1px; border-radius:8px;background-color: #F5F5F5;width:90%;padding:40px;">
                <p style="font-size:1.1em">Hi,</p>
                <p>Use the following OTP to verify and authenticate your account. OTP is valid for 10 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br>Login Test</p>
                <hr style="border:none;border-top:1px solid #eee">
            </div>
        </div>
        `
    };
    //send email to the user email address
    const response = await sgMail.send(msg);
    return response;
}

interface OtpTemplateParams {
  otp: string;
  title?: string;
  message?: string;
  companyName?: string;
  companyLogo?: string | null;
  supportEmail?: string;
  expiryMinutes?: number;
  primaryColor?: string;
  userName?: string | null;
}

export function otpTemplate({
  otp,
  title = "Verify Your CodeClash Account",
  message = "Welcome to the arena! Use the verification code below to complete your authentication and start battling.",
  companyName = "CodeClash.AI",
  companyLogo = null,
  supportEmail = "support@codeclash.ai",
  expiryMinutes = 5,
  primaryColor = "#FDB022",
  userName = null,
}: OtpTemplateParams) {
  // Validate required parameters
  if (!otp) {
    throw new Error("OTP parameter is required");
  }

  // Generate current year for footer
  const currentYear = new Date().getFullYear();

  // Personal greeting
  const greeting = userName ? `Hello ${userName},` : "Hello Champion,";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #fafafa !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
      line-height: 1.6 !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
    }
    
    table {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }
    
    img {
      border: 0 !important;
      height: auto !important;
      line-height: 100% !important;
      outline: none !important;
      text-decoration: none !important;
    }
    
    /* Container styles */
    .email-container {
      max-width: 600px !important;
      margin: 0 auto !important;
      background-color: #ffffff !important;
    }
    
    .email-wrapper {
      width: 100% !important;
      background-color: #fafafa !important;
      padding: 40px 20px !important;
    }
    
    /* Grid background pattern */
    .grid-pattern {
      background-image: 
        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px) !important;
      background-size: 64px 64px !important;
    }
    
    /* Header styles */
    .header {
      background: linear-gradient(135deg, #FDB022 0%, #f59e0b 100%) !important;
      padding: 40px 40px !important;
      text-align: center !important;
      border-radius: 12px 12px 0 0 !important;
      position: relative !important;
      overflow: hidden !important;
    }
    
    .header::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background-image: 
        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px) !important;
      background-size: 32px 32px !important;
      opacity: 0.3 !important;
    }
    
    .logo {
      margin-bottom: 16px !important;
      position: relative !important;
      z-index: 1 !important;
    }
    
    .logo img {
      max-height: 48px !important;
      width: auto !important;
    }
    
    .company-name {
      color: #000000 !important;
      font-size: 32px !important;
      font-weight: 800 !important;
      margin: 0 !important;
      text-decoration: none !important;
      position: relative !important;
      z-index: 1 !important;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
    }
    
    .tagline {
      color: #1f2937 !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      margin: 8px 0 0 0 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      position: relative !important;
      z-index: 1 !important;
    }
    
    /* Content styles */
    .content {
      padding: 48px 40px !important;
      background-color: #ffffff !important;
    }
    
    .greeting {
      color: #1f2937 !important;
      font-size: 20px !important;
      font-weight: 700 !important;
      margin: 0 0 24px 0 !important;
    }
    
    .message {
      color: #4b5563 !important;
      font-size: 16px !important;
      line-height: 1.7 !important;
      margin: 0 0 32px 0 !important;
    }
    
    /* OTP Container */
    .otp-container {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
      border: 3px solid #FDB022 !important;
      border-radius: 16px !important;
      padding: 40px 32px !important;
      text-align: center !important;
      margin: 32px 0 !important;
      position: relative !important;
    }
    
    .otp-label {
      color: #92400e !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      margin: 0 0 20px 0 !important;
    }
    
    .otp-code {
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%) !important;
      color: #FDB022 !important;
      font-size: 42px !important;
      font-weight: 900 !important;
      font-family: 'Courier New', Courier, monospace !important;
      padding: 24px 40px !important;
      border-radius: 12px !important;
      letter-spacing: 12px !important;
      display: inline-block !important;
      box-shadow: 
        0 8px 24px rgba(0, 0, 0, 0.15),
        0 0 0 4px rgba(253, 176, 34, 0.2) !important;
      margin: 0 !important;
      border: 2px solid #FDB022 !important;
    }
    
    .otp-icons {
      margin-top: 20px !important;
      font-size: 24px !important;
    }
    
    /* Security notice */
    .security-notice {
      background-color: #fee2e2 !important;
      border-left: 4px solid #ef4444 !important;
      padding: 20px 24px !important;
      border-radius: 0 8px 8px 0 !important;
      margin: 32px 0 !important;
    }
    
    .security-text {
      color: #991b1b !important;
      font-size: 14px !important;
      margin: 0 !important;
      font-weight: 500 !important;
    }
    
    .security-icon {
      display: inline-block !important;
      margin-right: 8px !important;
    }
    
    /* Action items */
    .action-text {
      color: #4b5563 !important;
      font-size: 15px !important;
      line-height: 1.6 !important;
      margin: 24px 0 !important;
    }
    
    .expiry-text {
      color: #dc2626 !important;
      font-weight: 700 !important;
    }
    
    /* Stats section */
    .stats-section {
      background-color: #f9fafb !important;
      border-radius: 12px !important;
      padding: 24px !important;
      margin: 32px 0 !important;
      text-align: center !important;
    }
    
    .stats-title {
      color: #6b7280 !important;
      font-size: 12px !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      margin: 0 0 16px 0 !important;
    }
    
    .stats-grid {
      display: flex !important;
      justify-content: space-around !important;
      gap: 16px !important;
    }
    
    .stat-item {
      flex: 1 !important;
    }
    
    .stat-value {
      color: #FDB022 !important;
      font-size: 24px !important;
      font-weight: 800 !important;
      margin: 0 0 4px 0 !important;
    }
    
    .stat-label {
      color: #6b7280 !important;
      font-size: 11px !important;
    }
    
    /* Footer */
    .footer {
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%) !important;
      padding: 40px 40px !important;
      text-align: center !important;
      border-radius: 0 0 12px 12px !important;
      position: relative !important;
      overflow: hidden !important;
    }
    
    .footer::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background-image: 
        linear-gradient(to right, rgba(253, 176, 34, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(253, 176, 34, 0.1) 1px, transparent 1px) !important;
      background-size: 32px 32px !important;
      opacity: 0.3 !important;
    }
    
    .signature {
      color: #e5e7eb !important;
      font-size: 16px !important;
      margin: 0 0 24px 0 !important;
      position: relative !important;
      z-index: 1 !important;
    }
    
    .team-name {
      font-weight: 700 !important;
      color: #FDB022 !important;
    }
    
    .divider {
      height: 1px !important;
      background-color: #374151 !important;
      margin: 24px 0 !important;
      position: relative !important;
      z-index: 1 !important;
    }
    
    .footer-links {
      margin: 16px 0 !important;
      position: relative !important;
      z-index: 1 !important;
    }
    
    .footer-link {
      color: #FDB022 !important;
      text-decoration: none !important;
      font-size: 14px !important;
      margin: 0 16px !important;
      font-weight: 600 !important;
    }
    
    .footer-link:hover {
      color: #f59e0b !important;
      text-decoration: underline !important;
    }
    
    .copyright {
      color: #9ca3af !important;
      font-size: 12px !important;
      margin: 16px 0 0 0 !important;
      position: relative !important;
      z-index: 1 !important;
    }
    
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 10px !important;
      }
      
      .header,
      .content,
      .footer {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }
      
      .company-name {
        font-size: 26px !important;
      }
      
      .otp-code {
        font-size: 32px !important;
        letter-spacing: 8px !important;
        padding: 20px 32px !important;
      }
      
      .otp-container {
        padding: 32px 20px !important;
      }
      
      .stats-grid {
        flex-direction: column !important;
      }
      
      .footer-link {
        display: block !important;
        margin: 8px 0 !important;
      }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .content {
        background-color: #ffffff !important;
      }
    }
    
    /* High contrast mode */
    @media (prefers-contrast: high) {
      .otp-code {
        border: 3px solid #000000 !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper grid-pattern">
    <table role="presentation" class="email-container" width="100%" cellspacing="0" cellpadding="0" border="0">
      
      <!-- Header -->
      <tr>
        <td class="header">
          ${companyLogo
      ? `
          <div class="logo">
            <img src="${companyLogo}" alt="${companyName} Logo" />
          </div>
          `
      : ""
    }
          <h1 class="company-name">${companyName}</h1>
          <p class="tagline">Battle • Code • Conquer</p>
        </td>
      </tr>
      
      <!-- Content -->
      <tr>
        <td class="content">
          <p class="greeting">${greeting}</p>
          
          <p class="message">${message}</p>
          
          <div class="otp-container">
            <p class="otp-label">🔐 Your Verification Code</p>
            <div class="otp-code" role="img" aria-label="OTP Code: ${otp.split("").join(" ")}">${otp}</div>
            <div class="otp-icons">⚔️ 💻 🏆</div>
          </div>
          
          <div class="stats-section">
            <p class="stats-title">Join the Arena</p>
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td class="stat-item" width="33%">
                  <p class="stat-value">50K+</p>
                  <p class="stat-label">BATTLES</p>
                </td>
                <td class="stat-item" width="33%">
                  <p class="stat-value">10K+</p>
                  <p class="stat-label">DEVELOPERS</p>
                </td>
                <td class="stat-item" width="33%">
                  <p class="stat-value">15+</p>
                  <p class="stat-label">LANGUAGES</p>
                </td>
              </tr>
            </table>
          </div>
          
          <div class="security-notice">
            <p class="security-text">
              <span class="security-icon">🛡️</span>
              <strong>Security Alert:</strong> This code is valid for <span class="expiry-text">${expiryMinutes} minutes only</span>. 
              Never share this code with anyone. Our team will never ask for your OTP.
            </p>
          </div>
          
          <p class="action-text">
            If you didn't request this verification code, please ignore this email or 
            <a href="mailto:${supportEmail}" style="color: #FDB022; font-weight: 600; text-decoration: none;">contact our support team</a> 
            immediately if you have concerns about your account security.
          </p>
        </td>
      </tr>
      
      <!-- Footer -->
      <tr>
        <td class="footer">
          <p class="signature">
            Ready to battle,<br>
            <span class="team-name">The ${companyName} Team</span>
          </p>
          
          <div class="divider"></div>
          
          <div class="footer-links">
            <a href="https://codeclash.ai/help" class="footer-link">Help Center</a>
            <a href="https://codeclash.ai/privacy" class="footer-link">Privacy Policy</a>
            <a href="https://codeclash.ai/terms" class="footer-link">Terms of Service</a>
          </div>
          
          <p class="copyright">
            © ${currentYear} ${companyName}. All rights reserved.<br>
            This is an automated message, please do not reply to this email.
          </p>
        </td>
      </tr>
      
    </table>
  </div>
</body>
</html>
  `.trim();
}
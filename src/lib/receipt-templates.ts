export interface ReceiptTemplate {
  subject: string;
  header: string;
  impactSection: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  taxInfo: string;
  nextSteps: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  footer: {
    title: string;
    description: string;
    contactInfo: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl?: string;
  };
}

export const defaultReceiptTemplate: ReceiptTemplate = {
  subject: 'Thank you for your donation to Together For Treaty',
  header: 'Together For Treaty - Thank you for your support',
  
  impactSection: {
    title: 'Your Impact',
    description: 'Thank you for supporting the Treaty movement. Your contribution helps fund:',
    bulletPoints: [
      'First Nations organisers and community leaders',
      'Community events and gatherings',
      'Storytelling and cultural preservation initiatives',
      'Educational programs and awareness campaigns',
      'Advocacy and policy development',
    ],
  },
  
  taxInfo: 'This campaign is being coordinated by Common Threads, supported by Centre for Australian Progress. Donations over $2 are tax deductible. Your contribution helps support First Nations organisers, community events, and storytelling.',
  
  nextSteps: {
    title: 'What happens next?',
    description: 'Together For Treaty is working towards a future where First Nations peoples have a voice in decisions that affect their lives and communities. Your support helps us:',
    bulletPoints: [
      'Build stronger relationships between First Nations and non-Indigenous Australians',
      'Advocate for meaningful Treaty negotiations',
      'Support community-led initiatives and cultural programs',
      'Create opportunities for truth-telling and reconciliation',
    ],
  },
  
  footer: {
    title: 'Centre for Australian Progress',
    description: 'Building a stronger future for all Australians',
    contactInfo: 'For questions about your donation, please contact us at info@australianprogress.org.au',
  },
  
  branding: {
    primaryColor: '#1a1a1a',
    secondaryColor: '#2d5a27',
  },
};

export const recurringReceiptTemplate: ReceiptTemplate = {
  ...defaultReceiptTemplate,
  subject: 'Thank you for your recurring donation to Together For Treaty',
  header: 'Together For Treaty - Thank you for your ongoing support',
  
  impactSection: {
    title: 'Your Ongoing Impact',
    description: 'Thank you for your commitment to the Treaty movement. Your recurring contribution helps sustain:',
    bulletPoints: [
      'Long-term community engagement programs',
      'Ongoing advocacy and policy work',
      'Cultural preservation and storytelling initiatives',
      'Educational resources and training programs',
      'Community leadership development',
    ],
  },
  
  nextSteps: {
    title: 'Your continued support makes a difference',
    description: 'As a recurring donor, you\'re helping us build sustainable, long-term change. Your ongoing commitment supports:',
    bulletPoints: [
      'Consistent funding for community initiatives',
      'Long-term relationship building with First Nations communities',
      'Sustained advocacy for Treaty negotiations',
      'Ongoing educational and awareness programs',
    ],
  },
  
  footer: {
    title: 'Centre for Australian Progress',
    description: 'Building a stronger future for all Australians',
    contactInfo: 'For questions about your donation, please contact us at info@australianprogress.org.au',
  },
};

export const largeDonationTemplate: ReceiptTemplate = {
  ...defaultReceiptTemplate,
  subject: 'Thank you for your generous donation to Together For Treaty',
  header: 'Together For Treaty - Thank you for your generous support',
  
  impactSection: {
    title: 'Your Generous Impact',
    description: 'Thank you for your significant contribution to the Treaty movement. Your generous donation enables:',
    bulletPoints: [
      'Major community initiatives and events',
      'Comprehensive advocacy campaigns',
      'Cultural preservation and storytelling projects',
      'Educational programs and resource development',
      'Leadership training and capacity building',
      'Research and policy development',
    ],
  },
  
  nextSteps: {
    title: 'Your leadership in action',
    description: 'As a major supporter, you\'re helping to lead the way towards reconciliation. Your contribution supports:',
    bulletPoints: [
      'Pioneering community-led initiatives',
      'Innovative approaches to Treaty advocacy',
      'Comprehensive cultural preservation programs',
      'Advanced educational and awareness campaigns',
    ],
  },
  
  footer: {
    title: 'Centre for Australian Progress',
    description: 'Building a stronger future for all Australians',
    contactInfo: 'For questions about your donation, please contact us at info@australianprogress.org.au',
  },
};

export const getReceiptTemplate = (amount: number, isRecurring: boolean = false): ReceiptTemplate => {
  if (isRecurring) {
    return recurringReceiptTemplate;
  }
  
  if (amount >= 100) {
    return largeDonationTemplate;
  }
  
  return defaultReceiptTemplate;
};

export const generateReceiptHtml = (
  template: ReceiptTemplate,
  amount: number,
  date: string,
  receiptNumber: string,
  customMessage?: string,
  donorName?: string
): string => {
  const donorFirstName = donorName ? donorName.split(' ')[0] : 'there';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for your donation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${template.branding.primaryColor}; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .footer { background: ${template.branding.primaryColor}; color: white; padding: 20px; text-align: center; font-size: 14px; }
        .amount { font-size: 24px; font-weight: bold; color: ${template.branding.secondaryColor}; }
        .message { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid ${template.branding.secondaryColor}; }
        .highlight { background: #e8f5e8; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .official-receipt { background: white; padding: 20px; margin: 20px 0; border: 2px solid #333; }
        .official-header { background: #f0f0f0; padding: 15px; margin: -20px -20px 20px -20px; border-bottom: 1px solid #ccc; }
        ul { margin: 10px 0; padding-left: 20px; }
        li { margin: 5px 0; }
        .receipt-details { margin: 20px 0; }
        .receipt-details p { margin: 5px 0; }
        .dgr-info { background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #2d5a27; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${template.header}</h1>
          <p>Thank you for your support</p>
        </div>
        
        <div class="content">
          <div class="message">
            <p><strong>Dear ${donorFirstName},</strong></p>
            <p>Thank you so much for your generous donation to the Centre for Australian Progress in support of the Together for Treaty campaign.</p>
            <p>${template.taxInfo}</p>
            <p>This is your donation receipt for your records. If you have any questions with regard to your donation, please reach out to us at info@australianprogress.org.au.</p>
          </div>

          <div class="official-receipt">
            <div class="official-header">
              <h3 style="margin: 0; color: #333;">Official Receipt</h3>
            </div>
            
            <div class="receipt-details">
              <p><strong>Receipt #:</strong> ${receiptNumber}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Donor Name:</strong> ${donorName || 'Anonymous'}</p>
              <p><strong>Donation Total:</strong> <span class="amount">$${amount.toFixed(2)} AUD</span></p>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 5px;">
              <p style="margin: 0; font-weight: bold;">Centre for Australian Progress</p>
              <p style="margin: 5px 0;">3 Albert Coates Lane, Melbourne VIC 3000</p>
              <p style="margin: 5px 0;">info@australianprogress.org.au</p>
            </div>
            
            <div class="dgr-info">
              <p style="margin: 0;">This is the receipt for your donation. Centre for Australian Progress Ltd (ABN: 76 158 172 484) is listed by name as a Deductible Gift Recipient (DGR) from 01 Jul 2024 to 30 Jun 2029. It is covered by Item 1 of the table in section 30-15 of the Income Tax Assessment Act 1997. Donations of $2 or more are tax deductible.</p>
            </div>
          </div>

          <div class="message">
            <h3>${template.impactSection.title}</h3>
            <p>${template.impactSection.description}</p>
            <ul>
              ${template.impactSection.bulletPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
          </div>

          ${customMessage ? `
            <div class="message">
              <h3>Personal Message</h3>
              <p>${customMessage}</p>
            </div>
          ` : ''}

          <div class="message">
            <h3>${template.nextSteps.title}</h3>
            <p>${template.nextSteps.description}</p>
            <ul>
              ${template.nextSteps.bulletPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
            
            <p>We'll keep you updated on our progress and ways you can continue to support the movement.</p>
          </div>

          <div class="highlight">
            <p><strong>Campaign:</strong> Together For Treaty</p>
            <p><strong>Coordinated by:</strong> Common Threads</p>
            <p><strong>Supported by:</strong> Centre for Australian Progress</p>
          </div>
        </div>
        
        <div class="footer">
          <p>${template.footer.title}</p>
          <p>${template.footer.description}</p>
          <p>${template.footer.contactInfo}</p>
          <p style="margin-top: 15px; font-size: 14px; font-weight: bold;">Thank you for your support. Any questions, please email us at info@australianprogress.org.au.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}; 
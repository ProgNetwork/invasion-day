export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  }
};

interface EventData {
  event: string;
  event_category: string;
  event_label?: string;
  value?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export const event = ({ action, category, label, value, utmParams }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  utmParams?: Record<string, string>;
}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const eventData: EventData = {
      event: action,
      event_category: category,
      event_label: label,
      value,
    };

    if (utmParams) {
      eventData.utm_source = utmParams.utm_source || '';
      eventData.utm_medium = utmParams.utm_medium || '';
      eventData.utm_campaign = utmParams.utm_campaign || '';
    }

    window.dataLayer.push(eventData);
  }
};

// Custom events for your app
export const trackDonation = (amount: number, method: string, utmParams?: Record<string, string>) => {
  event({
    action: 'donation',
    category: 'engagement',
    label: method,
    value: amount,
    utmParams,
  });
};

export const trackSignup = (type: string, utmParams?: Record<string, string>) => {
  event({
    action: 'signup',
    category: 'engagement',
    label: type,
    utmParams,
  });
};

export const trackDownload = (document: string, utmParams?: Record<string, string>) => {
  event({
    action: 'download',
    category: 'engagement',
    label: document,
    utmParams,
  });
};

export const trackContact = (method: string, utmParams?: Record<string, string>) => {
  event({
    action: 'contact',
    category: 'engagement',
    label: method,
    utmParams,
  });
};

export const trackPledge = (utmParams: Record<string, string>) => {
  event({
    action: 'pledge_signup',
    category: 'engagement',
    label: 'pledge_signature_website',
    utmParams,
  });
};

export const trackSocialShare = (platform: string, utmParams: Record<string, string>) => {
  event({
    action: 'social_share',
    category: 'engagement',
    label: platform,
    utmParams,
  });
};

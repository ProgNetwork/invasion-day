export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: action,
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// Custom events for your app
export const trackDonation = (amount: number, method: string) => {
  event({
    action: 'donation',
    category: 'engagement',
    label: method,
    value: amount,
  });
};

export const trackSignup = (type: string) => {
  event({
    action: 'signup',
    category: 'engagement',
    label: type,
  });
};

export const trackDownload = (document: string) => {
  event({
    action: 'download',
    category: 'engagement',
    label: document,
  });
};

export const trackContact = (method: string) => {
  event({
    action: 'contact',
    category: 'engagement',
    label: method,
  });
};

export const CONTACT_DATA = {
  github: 'https://github.com/Abhilash676',
  linkedin: 'https://www.linkedin.com/in/abhilash-h-s-1068a325b',
  instagram: 'abhi_ka_13', // Add your Instagram link if you have one
  whatsapp: '9353556918', // Add your WhatsApp link (e.g. https://wa.me/91XXXXXXXXXX)
  email: 'abhilashh942@gmail.com',
  mobile: '9353556918', // Add your mobile number if you want to display it
  resume: '/resume.pdf', // Add your resume PDF/Google Drive link after uploading it
};

// Template methods for links
export const getMailto = () => `mailto:${CONTACT_DATA.email}`;
export const getWhatsApp = () => CONTACT_DATA.whatsapp;
export const getResume = () => CONTACT_DATA.resume;
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'EN', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'AS', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'BN', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'MZ', name: 'Mizo', nativeName: 'Mizo', flag: '🇮🇳' }
];

export const TRANSLATIONS = {
  EN: {
    liveAdvisory: 'LIVE ADVISORY:',
    advisoryText: 'Heavy rainfall alert in East Sikkim & Dima Hasao (Assam). High landslide susceptibility on NH-29.',
    sensorMesh: 'NER Sensor Mesh: ACTIVE',
    reportHazard: 'Report Hazard / Crack',
    checkRoadPasses: 'Check Road Passes',
    commandCenter: 'Command Center',
    sosDistress: 'SOS DISTRESS',
    liveOverview: 'Live Overview',
    fieldReport: 'Citizen & Field Report',
    safeRoutes: 'Roads & Safe Route',
    commandAdmin: 'Command Center (Admin)',
    threatMatrix: 'North Eastern States Threat Matrix',
    liveBulletins: 'Live Verified Incident Bulletins',
    language: 'Language',
  },
  HI: {
    liveAdvisory: 'लाइव चेतावनी:',
    advisoryText: 'पूर्वी सिक्किम और डिमा हसाओ (असम) में भारी बारिश का अलर्ट। एनएच-29 पर भूस्खलन की अधिक संभावना।',
    sensorMesh: 'पूर्वोत्तर सेंसर मेष: सक्रिय',
    reportHazard: 'खतरे की रिपोर्ट करें',
    checkRoadPasses: 'सड़क मार्ग जांचें',
    commandCenter: 'कमांड सेंटर',
    sosDistress: 'आपातकालीन एसओएस',
    liveOverview: 'लाइव अवलोकन',
    fieldReport: 'नागरिक एवं क्षेत्र रिपोर्ट',
    safeRoutes: 'सड़कें और सुरक्षित मार्ग',
    commandAdmin: 'कमांड सेंटर (व्यवस्थापक)',
    threatMatrix: 'पूर्वोत्तर राज्य खतरा मैट्रिक्स',
    liveBulletins: 'लाइव सत्यापित घटना बुलेटिन',
    language: 'भाषा',
  },
  AS: {
    liveAdvisory: 'লাইভ পৰামৰ্শ:',
    advisoryText: 'পূব ছিকিম আৰু ডিমা হাছাওত প্ৰবল বৃষ্টিপাতৰ সতৰ্কবাণী। NH-29 ত ভূমিখণ্ডৰ উচ্চ প্ৰৱণতা।',
    sensorMesh: 'উত্তৰ-পূব সংবেদক জালি: সক্ৰিয়',
    reportHazard: 'সংকট ৰিপৰ্ট কৰক',
    checkRoadPasses: 'পথ সূচী পৰীক্ষা কৰক',
    commandCenter: 'কমাণ্ড চেণ্টাৰ',
    sosDistress: 'জৰুৰী কালীন SOS',
    liveOverview: 'লাইভ অৱলোকন',
    fieldReport: 'ৰাইজৰ আৰু ফীল্ড ৰিপৰ্ট',
    safeRoutes: 'নিৰাপদ পথ নিৰ্দেশক',
    commandAdmin: 'কমাণ্ড চেণ্টাৰ (এডমিন)',
    threatMatrix: 'উত্তৰ-পূব ৰাজ্যসমূহৰ ভাবুকি',
    liveBulletins: 'লাইভ নিশ্চিত ঘটনা তথ্য',
    language: 'ভাষা',
  },
  BN: {
    liveAdvisory: 'লাইভ সতর্কতা:',
    advisoryText: 'পূর্ব সিকিম ও ডিমা হাসাও-এ ভারী বৃষ্টির সতর্কতা। NH-29-এ ধসের প্রবল সম্ভাবনা।',
    sensorMesh: 'উত্তর-পূর্ব সেন্সর নেটওয়ার্ক: সক্রিয়',
    reportHazard: 'বিপদ রিপোর্ট করুন',
    checkRoadPasses: 'রাস্তা পরীক্ষা করুন',
    commandCenter: 'কমান্ড সেন্টার',
    sosDistress: 'জরুরি এসওএস',
    liveOverview: 'লাইভ ওভারভিউ',
    fieldReport: 'নাগরিক ও ফিল্ড রিপোর্ট',
    safeRoutes: 'নিরাপদ রুট নির্দেশিকা',
    commandAdmin: 'কমান্ড সেন্টার (এডমিন)',
    threatMatrix: 'উত্তর-পূর্ব রাজ্য সমূহের ঝুঁকি',
    liveBulletins: 'লাইভ যাচাইকৃত সংবাদ',
    language: 'ভাষা',
  },
  MZ: {
    liveAdvisory: 'FIMKHURNA ADVOCACY:',
    advisoryText: 'East Sikkim & Dima Hasao-ah ruah tui tam tak tlak tur fimkhurna alert. NH-29 ah min nawn thut thei.',
    sensorMesh: 'NER Sensor Mesh: ACTIVE',
    reportHazard: 'Chhiatrupna Report Rah',
    checkRoadPasses: 'Kawtthler Enteh',
    commandCenter: 'Command Center',
    sosDistress: 'SOS CHHIATRUPNA',
    liveOverview: 'Live Overview',
    fieldReport: 'Citizen & Field Report',
    safeRoutes: 'Kawtthler & Hmun Him',
    commandAdmin: 'Command Center (Admin)',
    threatMatrix: 'NER State Thimhna Matrix',
    liveBulletins: 'Live Hmun Thar Bulletins',
    language: 'Tawng',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('trishul_lang') || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('trishul_lang', currentLang);
  }, [currentLang]);

  const t = (key) => {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

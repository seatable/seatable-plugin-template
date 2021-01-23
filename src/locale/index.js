import intl from 'react-intl-universal';
import de from './lang/de';
import en from './lang/en';
import fr from './lang/fr';
import zh_CN from './lang/zh_CN';

const LOCALES = {
  'de': de,
  'en': en,
  'fr': fr,
  'zh-cn': zh_CN,
};

const LAUGUAGE = 'zh-cn';

let lang = (window.dtable && window.dtable.lang) ? window.dtable.lang : LAUGUAGE;
intl.init({currentLocale: lang, locales: LOCALES});
import intl from 'react-intl-universal';
import de from './lang/de';
import en from './lang/en';
import fr from './lang/fr';
import fr from './lang/fr';
import es from './lang/es';
import ru from './lang/ru';
import pt from './lang/pt';
import zh_CN from './lang/zh_CN';

const LOCALES = {
  'de': de,
  'en': en,
  'fr': fr,
  'es': es,
  'ru': ru,
  'pt': pt,
  'zh-cn': zh_CN,
};

const LAUGUAGE = 'zh-cn';

let lang = (window.dtable && window.dtable.lang) ? window.dtable.lang : LAUGUAGE;
intl.init({currentLocale: lang, locales: LOCALES});

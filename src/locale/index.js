import intl from 'react-intl-universal';
import cs from './lang/cs';
import de from './lang/de';
import en from './lang/en';
import es_AR from './lang/es-AR';
import es_MX from './lang/es-MX';
import es from './lang/es';
import fr from './lang/fr';
import it from './lang/it';
import ru from './lang/ru';
import zh_CN from './lang/zh-CN';
import { LAUGUAGE } from '../config/config';

let locales = {
  'cs': cs,
  'de': de,
  'en': en,
  'es_AR': es_AR,
  'es_MX': es_MX,
  'es': es,
  'fr': fr,
  'it': it,
  'ru': ru,
  'zh-cn': zh_CN,
};

let lang = (window.dtable && window.dtable.lang) ? window.dtable.lang : LAUGUAGE;
console.log(lang);
intl.init({
  currentLocale: lang,
  locales
});
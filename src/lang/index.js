/** import lang files */
import { LANGUAGE } from '../config/config';
import cs from '../locals/cs';
import de from '../locals/de';
import en from '../locals/en';
import es_AR from '../locals/es-AR';
import es_MX from '../locals/es-MX';
import es from '../locals/es';
import fr from '../locals/fr';
import it from '../locals/it';
import ru from '../locals/ru';
import zh_CN from '../locals/zh-CN';

let langData = {
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

export function setLocale(args) {
  let lang = typeof args === 'string' ? args : LANGUAGE;
  langData = langData[lang] || langData[LANGUAGE];
}

export function getLocale(key, def) {
  if (!key) return def
  if (!langData[key]) {
    return def || key
  }
  return langData[key]
}

export function substitute(str, obj) {
  if (typeof str === 'string') {
    if (str.indexOf('{') < 0) {
      return str
    }

    return str.replace(/\\?\{([^{}]+)\}/g, (match, name) => {
      if (match.charAt(0) === '\\') {
        return match.slice(1)
      }
      return obj[name] === null || obj[name] === undefined ? '' : obj[name]
    })
  } else if (typeof str === 'function') {
    let val = str(obj)
    if (val === obj && typeof val === 'object') {
      val = Object.assign({}, obj)
    }
    return val
  }

  return ''
}
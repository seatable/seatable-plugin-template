const path = require('path');
const fs = require('fs');

const sourcePath = path.resolve(__dirname, '../public/locale');
const targetPath = path.resolve(__dirname, '../src/locale/lang');

const SUPPORT_LANGUAGES = ['en', 'es', 'de', 'fr', 'ru', 'zh_CN', 'pt'];
const files = fs.readdirSync(path.join(sourcePath, SUPPORT_LANGUAGES[0]));
const pluginName = files[0];

const generatorLanguage = (lang, content) => {
  return (
`const ${lang} = ${content};

export default ${lang};`
  );
}

SUPPORT_LANGUAGES.forEach(lang => {
  const contentPath = path.join(sourcePath, lang, pluginName);
  const isExist = fs.existsSync(contentPath);
  if (!isExist) return;
  const content = fs.readFileSync(contentPath, 'utf-8');

  const langPath = path.join(targetPath, `${lang}.js`);
  const langContent = generatorLanguage(lang, content);
  fs.writeFileSync(langPath, langContent);
});

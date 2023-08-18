const translations = {
  nl: {
    home: {
      title: 'Thuis',
    },
    userDetail: {
      title: 'User Details',
      actions: { save: 'Save' },
    },
  },
  en: {
    home: {
      title: 'Home',
    },
  },
};

function getChild(obj: Object, key: string): Object | string {
  type objkeys = keyof typeof obj;

  const key1 = key as objkeys;
  console.log(obj[key1]);

  return obj[key1];
}

export default function useTranslation(
  language: 'en' | 'nl' = 'en'
): (key: string) => string {
  return (key: string): string => {
    const lang = translations[language];
    const keys = key.split('.');

    let translation: Object | string = lang;
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];

      translation = getChild(translation, key);
    }

    return translation as string;
  };
}

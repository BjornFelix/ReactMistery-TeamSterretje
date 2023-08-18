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

  const parsedKey = key as objkeys;
  if (typeof obj === 'string') {
    return obj;
  }
  const newObj = obj[parsedKey];
  if (newObj === undefined) {
    return 'unknown-key';
  }
  return newObj;
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

    if (typeof translation === 'object') {
      return 'unknown-key';
    }

    return translation as string;
  };
}

import { useEffect, useState } from "react";

const translations = {
  nl: {
    home: {
      title: "Thuis",
    },
  },
  en: {
    home: {
      title: "Home",
    },
  },
};

export default function useTranslation(
  language: "en" | "nl" = "en"
): (key: string) => string {
  return (key: string): string => {
    const keys = key.split(".");
    //call func to get keys

    const lang = translations[language];

    type objkeys = keyof typeof lang;

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
    }

    const key1 = keys[0] as objkeys;
    console.log(lang[key1]);

    return lang[keys[0]][keys[1]] as string;
  };
}

function getChild() {}

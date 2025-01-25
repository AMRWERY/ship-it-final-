import { defineRule, configure } from "vee-validate";
import {
  required,
  min,
  alpha_spaces,
  max,
  regex,
  between,
  numeric
} from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ar from "@vee-validate/i18n/dist/locale/ar.json";
import inputsEn from "~/locales/en.json";
import inputsAr from "~/locales/ar.json";

const getLocale = () => {
  if (process.client) {
    return localStorage.getItem("locale");
  }
  return null;
};

const locale = getLocale();
// const locale = localStorage.getItem("locale");

export default defineNuxtPlugin((app) => {
  defineRule("required", required);
  defineRule("email", (value) => {
    if (!value || !value.length) {
      return true;
    }
    if (!/^[A-Z0-9._%+-]+@ship\.com$/i.test(value)) {
      return "Email must be a valid 'ship.com' address";
    }
    return true;
  });

  defineRule("minLength", (value, [limit]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
    }
    return true;
  });

  defineRule("confirmed", (value, [target]) => {
    if (value === target) {
      return true;
    }
    return "Passwords must match";
  });

  defineRule("min", min);
  defineRule("alpha_spaces", alpha_spaces);
  defineRule("max", max);
  defineRule("regex", regex);
  defineRule("between", between);
  defineRule("numeric", numeric);

  configure({
    generateMessage: localize({
      en: {
        ...en,
        names: inputsEn.form,
      },
      ar: {
        ...ar,
        names: inputsAr.form,
      },
    }),
  });

  // setLocale("en");
  setLocale(locale || "en");
});

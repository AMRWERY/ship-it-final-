import { defineRule, configure } from "vee-validate";
import {
  required,
  min,
  alpha_spaces,
  max,
  regex,
  between,
  numeric,
  length,
} from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ar from "@vee-validate/i18n/dist/locale/ar.json";
import inputsEn from "~/locales/en.json";
import inputsAr from "~/locales/ar.json";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", (value) => {
    if (!value || !value.length) {
      return true;
    }
    if (!/^[A-Z0-9._%+-]+@ship\.com$/i.test(value)) {
      return nuxtApp.$i18n.t("form.email_valid_ship_error");
    }
    return true;
  });

  defineRule("minLength", (value, [limit]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return nuxtApp.$i18n.t("form.minLengthError", { limit });
    }
    return true;
  });

  defineRule("confirmed", (value, [target]) => {
    if (value === target) {
      return true;
    }
    return nuxtApp.$i18n.t("form.passwords_must_match");
  });

  defineRule("min", min);
  defineRule("alpha_spaces", alpha_spaces);
  defineRule("max", max);
  defineRule("regex", regex);
  defineRule("between", between);
  defineRule("numeric", numeric);
  defineRule("length", length);

  const updateValidationLocale = (locale) => {
    const messages = {
      en: { ...en, names: inputsEn.form },
      ar: { ...ar, names: inputsAr.form },
    };

    configure({
      generateMessage: localize(locale, messages[locale]),
      validateOnBlur: true,
      validateOnChange: false,
      validateOnInput: true,
      validateOnModelUpdate: true,
    });
    setLocale(locale);
  };

  if (process.client) {
    const initialLocale = localStorage.getItem("locale") || "en";
    updateValidationLocale(initialLocale);
  }

  const localeStore = useLocaleStore();

  watch(
    () => localeStore.locale,
    (newLocale) => {
      updateValidationLocale(newLocale);
      nuxtApp.$i18n.setLocale(newLocale);
    }
  );
});

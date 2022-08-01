export const openUrl = (url, asNewTab = false) => {
  const newTab = window.open(url, asNewTab ? "_blank" : "_self");
  newTab?.focus();
};

export const goBack = () => {
  window.history.go(-1);
};

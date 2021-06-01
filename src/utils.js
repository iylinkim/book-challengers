export const toggleClassName = (
  darkTheme,
  styles,
  className,
  secondClassName = ""
) => {
  const mainClassName = styles[className];
  const subClassName = styles[secondClassName];
  
  return darkTheme
    ? `${styles.dark} ${mainClassName} ${subClassName}`
    : `${mainClassName} ${subClassName}`;
};

export const getClassName = (componentClassName = "") =>
  (elementClassName: string = null) =>
    [componentClassName]
      .concat(elementClassName)
      .join(elementClassName && elementClassName.indexOf("_") !== 0 ? "__" : "");

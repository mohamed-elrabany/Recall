import { lazy, type ComponentType } from "react";

function lazyPage<T extends { Component: ComponentType }>(
  factory: () => Promise<T>
) {
  return lazy(() => factory().then((module) => ({ default: module.Component })));
}

export default lazyPage;
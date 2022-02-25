import { renderToStaticMarkup } from "react-dom/server";
import { createElement, ReactPropTypes } from "react";
import { IconBaseProps, IconType } from 'react-icons/lib'

export const svgToString = (Component:IconType, props?: IconBaseProps) =>
  `data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(createElement(Component, props))
  )}`;
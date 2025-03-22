declare module "cross-country" {
  import { ReactNode, CSSProperties } from "react";

  interface BaseProps {
    children?: ReactNode;
    customStyle?: CSSProperties;
    customClass?: string;
  }

  export interface HeadwindsLogoProps extends BaseProps {
    // Add any specific Column props here
  }

  export interface ColumnProps extends BaseProps {
    // Add any specific Column props here
  }

  export interface RowProps extends BaseProps {
    // Add any specific Row props here
  }

  export interface ParagraphProps extends BaseProps {
    // Add any specific Paragraph props
  }

  export interface HeadlineProps extends BaseProps {
    // Add any specific Headline props here
  }

  export interface HunterProps extends BaseProps {
    // Add any specific Headline props here
  }

  export interface SubHeadlineProps extends BaseProps {
    // Add any specific SubHeadline props here
  }

  export interface LinkProps extends BaseProps {
    url: string;
    target?: string;
    rel?: string;
  }

  export interface ListProps extends BaseProps {
    // Add any specific List props
  }

  export interface ScrambleTextProps extends BaseProps {
    text: string;
  }

  export interface ListItemProps extends BaseProps {
    // Add any specific ListItem props
  }

  export interface AnimatedNumberProps extends BaseProps {
    value?: number;
    duration?: number;
    formatValue?: (value: number) => string;
    easing?: string;
    delay?: number;
    to?: number;
    from?: number;
  }

  export class Column extends React.Component<ColumnProps> {}
  export class Row extends React.Component<RowProps> {}
  export class Paragraph extends React.Component<ParagraphProps> {}
  export class Headline extends React.Component<HeadlineProps> {}
  export class SubHeadline extends React.Component<SubHeadlineProps> {}
  export class Link extends React.Component<LinkProps> {}
  export class List extends React.Component<ListProps> {}
  export class ListItem extends React.Component<ListItemProps> {}
  export class AnimateNumber extends React.Component<AnimatedNumberProps> {}
  export class Hunter extends React.Component<HunterProps> {}
  export class HeadwindsLogo extends React.Component<HeadwindsLogoProps> {}
  export class ScrambleText extends React.Component<ScrambleTextProps> {}
}

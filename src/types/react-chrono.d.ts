declare module 'react-chrono' {
  import { ReactNode } from 'react';

  export interface TimelineItemModel {
    title?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardDetailedText?: string | string[];
    media?: {
      type?: 'IMAGE' | 'VIDEO';
      source?: {
        url: string;
      };
    };
    url?: string;
  }

  export interface TimelineProps {
    items?: TimelineItemModel[];
    mode?: 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
    cardHeight?: number;
    slideShow?: boolean;
    scrollable?: boolean | { scrollbar: boolean };
    theme?: {
      primary?: string;
      secondary?: string;
      cardBgColor?: string;
      titleColor?: string;
      titleColorActive?: string;
      cardForeColor?: string;
    };
    fontSizes?: {
      cardSubtitle?: string;
      cardText?: string;
      cardTitle?: string;
      title?: string;
    };
    disableClickOnCircle?: boolean;
    children?: ReactNode;
    onScrollEnd?: () => void;
    onItemSelected?: (item: TimelineItemModel) => void;
    activeItemIndex?: number;
  }

  export const Chrono: React.FC<TimelineProps>;
}

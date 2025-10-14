declare module '@/components/TextType' {
  import { ReactNode } from 'react';

  export interface TextTypeProps {
    text: string | string[];
    as?: keyof JSX.IntrinsicElements;
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string;
    cursorClassName?: string;
    cursorBlinkDuration?: number;
    textColors?: string[];
    variableSpeed?: {
      min: number;
      max: number;
    };
    onSentenceComplete?: (text: string, index: number) => void;
    startOnVisible?: boolean;
    reverseMode?: boolean;
  }

  const TextType: React.FC<TextTypeProps>;
  export default TextType;
}

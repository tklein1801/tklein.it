import {JetBrains_Mono} from 'next/font/google';

const font = JetBrains_Mono({subsets: ['latin']});
export const fontClassName = font.className;
export const fontFamily = font.style.fontFamily;

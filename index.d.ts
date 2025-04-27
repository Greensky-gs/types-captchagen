import { Canvas, JPEGStream, PNGStream } from "canvas";

declare module "captchagen" {
    // Utils interfaces
    export interface BaseOptions {
        width: number;
        height: number;
    }
    export interface CaptchaClassOptions {
        width?: number;
        height?: number;
        text?: string;
        font?: string;
    }

    // Captcha
    export class Captcha {
        constructor(options?: CaptchaClassOptions);
        
        use(middleware: CallableFunction): this;
        reset(): this;
        generate(): this;

        // Getters
        text(): string;
        height(): number;
        width(): number;

        uri(): string;
        buffer(): Buffer;
        buffer<K extends "png" | "jpeg">(type: K): K extends "png" ? PNGStream : K extends "jpeg" ? JPEGStream : never;
    }

    // Methods
    export function drawBackground(canvas: Canvas, options: BaseOptions): Canvas;
    export function drawText(canvas: Canvas, options: BaseOptions & { text: string; font: string; }): Canvas;
    export function drawLines(canvas: Canvas, options: BaseOptions): Canvas;

    // Utils methods
    export function getColors(count: number): [{ r: number; g: number; b: number; css: string; }][]
    export function getFontSize(height: number, width: number, font: string): number;
    export function generateText(): string;

    // Create function
    export function create(options: CaptchaClassOptions): Captcha;
}
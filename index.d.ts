type loadCallback<T = void> = (...args: any[]) => T;

declare function loadScriptOnce<T = void>(src: string, callback?: loadCallback<T>): Promise<T>;

declare module "load-script-once" {
    export default loadScriptOnce;
}

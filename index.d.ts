declare function loadScriptOnce<C = () => any>(src: string, callback?: C): Promise<C>;

declare module "load-script-once" {
    export default loadScriptOnce;
}

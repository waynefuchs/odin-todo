const DEBUG = false;
export default class Log {
    static debug(message) {
        if(!DEBUG) return;
        console.warn(message);
    }
}
let id = 0;

export default {
    getNext() {
        return id++;
    }
};

export function zero() {
    id = 0;
}
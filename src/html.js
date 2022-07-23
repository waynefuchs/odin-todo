export default class HTML {
    static newDiv(divClass="", divId="") {
        const body = document.querySelector('body');
        const div = document.createElement('div');
        divClass.split(' ')
            .filter(c => c !== "")
            .forEach(c => div.classList.add(c));
        div.id = divId;
        div.textContent = `${divId}`;
        body.append(div);
        return div;
    }
}
export default class HTML {
  static div(divClass = "", divID = "") {
    const div = document.createElement("div");
    divClass
      .split(" ")
      .filter((c) => c !== "")
      .forEach((c) => div.classList.add(c));
    div.id = divID;
    return div;
  }

  static checkbox(name = "") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = name;
    checkbox.name = name;

    return checkbox;
  }

  static label(text = "", forInput = "") {
    const label = document.createElement("label");
    label.htmlFor = forInput;
    label.textContent = text;
    return label;
  }
}

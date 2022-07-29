import "./style.css";
import UI from "./modules/ui";

// document.addEventListener('DOMContentLoaded', UI.loadSite);
// window.onload = UI.loadSite();

document.addEventListener("DOMContentLoaded", function(){
    console.log("Site loaded?");
    UI.loadSite();
});

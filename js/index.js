import "../css/style.scss";
import List from "./components/List";
import Animation from "./components/Animation";

const animation = new Animation();
const listRef = document.querySelector(".app__listHolder");
new List(5, listRef, animation);

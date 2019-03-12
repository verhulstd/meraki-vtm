export default class Loader {
  constructor(holder) {
    this._holder = holder;
    this.loaderHTML = this.generateHtml();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML("beforeend", `<p class="loader"></p>`);
    return this._holder.querySelector("p.loader");
  }
  show() {
    this.loaderHTML.style.display = "block";
  }
  hide() {
    this.loaderHTML.style.display = "none";
  }
}

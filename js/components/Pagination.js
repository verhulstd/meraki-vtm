export default class Pagination {
  constructor(holder, loadPrev, loadNext, list) {
    this._holder = holder;
    this._list = list;
    this._boundLoadNext = loadNext.bind(this._list);
    this._boundLoadPrev = loadPrev.bind(this._list);
    this._navHtml = this.generateHtml();
    this.enableEvents();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
              <div class="navigation">
                <a href="#" class="navigation__prev icon-left-big"></a>
                <div class="navigation__stats">
                  <span class="stats__from"></span>
                   - 
                  <span class="stats__to"></span>
                   / 
                  <span class="stats__total"></span> 
                </div>
                <a href="#" class="navigation__next icon-right-big"></a>
              </div>
            `
    );
    return this._holder.querySelector(".navigation");
  }
  enableEvents() {
    this._navHtml
      .querySelector(".navigation__next")
      .addEventListener("click", this._boundLoadNext);

    this._navHtml
      .querySelector(".navigation__prev")
      .addEventListener("click", this._boundLoadPrev);
  }
  disableEvents() {
    this._navHtml
      .querySelector(".navigation__next")
      .removeEventListener("click", this._boundLoadNext);

    this._navHtml
      .querySelector(".navigation__prev")
      .removeEventListener("click", this._boundLoadPrev);
  }
  update(start, end, total) {
    if (start === 1) {
      this._navHtml.querySelector(".navigation__prev").style.visibility =
        "hidden";
    } else {
      this._navHtml.querySelector(".navigation__prev").style.visibility =
        "visible";
    }
    this._navHtml.querySelector(".stats__from").textContent = start;
    this._navHtml.querySelector(".stats__to").textContent = end;
    this._navHtml.querySelector(".stats__total").textContent = total;
    this.show();
  }
  show() {
    this._navHtml.style.display = "flex";
  }
  hide() {
    this._navHtml.style.display = "none";
  }
}

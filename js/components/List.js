import axios from "axios";

import Loader from "./Loader";
import LightBox from "./LightBox";
import Pagination from "./Pagination";
import ListItem from "./ListItem";

export default class List {
  constructor(nrOfItems, holder, animation) {
    this._nrOfItems = nrOfItems;
    this._holder = holder;
    this._animation = animation;
    this._pageNr = 0;
    this.loader = new Loader(this._holder);
    this._lightBox = new LightBox(this._holder);
    this._pagination = new Pagination(
      this._holder,
      this.loadPrev,
      this.loadNext,
      this
    );
    this._pagination.hide();
    this.listHtml = this.generateHtml();
    this.loadData();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML("beforeend", `<div class="list"></div>`);
    return this._holder.querySelector(".list");
  }

  loadData() {
    this._pagination.disableEvents();
    this.hide();
    this.loader.show();
    axios
      .get(
        "https://nieuws.vtm.be/feed/articles?type=video&fields=video&count=" +
          this._nrOfItems +
          "&from=" +
          this._pageNr
      )
      .then(results => {
        this.generateItems(results);
      });
  }
  loadPrev(e) {
    e.preventDefault();
    this._pageNr -= this._nrOfItems;
    this.loadData();
  }
  loadNext(e) {
    e.preventDefault();
    this._pageNr += this._nrOfItems;
    this.loadData();
  }
  generateItems(data) {
    this.listHtml.innerHTML = "";
    let nr = 0;
    data.data.response.items.forEach(article => {
      new ListItem(article, this, nr);
      nr++;
    });
    this._pagination.update(
      this._pageNr + 1,
      this._pageNr + this._nrOfItems,
      data.data.response.total
    );
    this._pagination.enableEvents();
    this.loader.hide();
    this._animation.wow.sync();
    this.show();
  }
  show() {
    this.listHtml.style.display = "block";
  }
  hide() {
    this.listHtml.style.display = "none";
  }
}

import * as basicLightbox from "basiclightbox";

export default class LightBox {
  constructor(holder) {
    this._holder = holder;
    this._lightBoxHtml = this.generateHtml();
    this._lightBoxInstance = basicLightbox.create(this._lightBoxHtml);
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
            <div class="lightboxContent"></div>
        `
    );
    return this._holder.querySelector(".lightboxContent");
  }
}

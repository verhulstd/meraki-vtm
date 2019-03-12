export default class ListItem {
  constructor(article, list, nr) {
    this._article = article;
    this._list = list;
    this._nr = nr;
    this.listItemHtml = this.generateHtml();
    this.setUpEvents();
  }
  generateHtml() {
    this._list.listHtml.insertAdjacentHTML(
      "beforeend",
      `
        <a href="#" class="list__item wow fadeInDown"  data-wow-duration="0.2s" data-wow-delay="${this
          ._nr * 0.1}s">
          <img src="${this._article.image.thumb}" class="list__item__image"/>
          <p class="list__item__title">${this._article.title}</p>
          <p class="list__item__date">${this._article.created.formatted}</p>
        </a>
      `
    );
    return [
      ...this._list.listHtml.querySelectorAll(".list__item")
    ].reverse()[0];
  }
  setUpEvents() {
    this.listItemHtml.addEventListener(
      "click",
      function() {
        const lb = this._list._lightBox._lightBoxInstance.element();
        lb.innerHTML = `
            <video controls autoplay>
                <source src="${
                  this._article.video.url.default
                }" type="video/mp4">
            </video>
            `;
        this._list._lightBox._lightBoxInstance.show();
      }.bind(this)
    );
  }
}

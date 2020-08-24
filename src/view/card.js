import AbstractView from "./abstract.js";
import {isTaskExpired, isTaskRepeating, formatTaskDueDate} from "../utils/task.js";

const createCardMarkup = (task) => {
  const {color, description, dueDate, repeating, isArchive, isFavorite} = task;

  const deadlineClassName = isTaskExpired(dueDate) ? `card--deadline` : ``;
  const repeatClassName = isTaskRepeating(repeating) ? `card--repeat` : ``;
  const archiveClassName = isArchive ? `card__btn--archive card__btn--disabled` : `card__btn--archive`;
  const favoriteClassName = isFavorite ? `card__btn--favorites card__btn--disabled` : `card__btn--favorites`;

  return (
    `<article class="card card--${color} ${deadlineClassName} ${repeatClassName}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn ${archiveClassName}">
              archive
            </button>
            <button type="button" class="card__btn ${favoriteClassName}">
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
            ${dueDate !== null ? `<div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${formatTaskDueDate(dueDate)}</span>
                  <span class="card__time"></span>
                </p>
              </div>
            </div>` : ``}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Card extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return createCardMarkup(this._task);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _archiveClickHandler(evt) {
    evt.preventDefault();
    this._callback.archiveClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  setArchiveClickHandler(callback) {
    this._callback.archiveClick = callback;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._archiveClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._favoritesClickHandler);
  }
}

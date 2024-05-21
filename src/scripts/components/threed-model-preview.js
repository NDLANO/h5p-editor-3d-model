import '@components/threed-model.js';
import Util from '@services/util.js';
import ThreeDModel from './threed-model.js';
import './threed-model-preview.scss';

export default class threeDModelPreview {
  /**
   * 3D Preview of model
   * @param {object} [params] Parameters.
   * @param {object} [callbacks] Callbacks.
   * @class H5PEditor.ThreeDModelPreview
   */
  constructor(params = {}, callbacks = {}) {
    this.params = Util.extend({}, params);

    this.callbacks = Util.extend({
      onDelete: () => {}
    }, callbacks);

    this.model = new ThreeDModel({
      className: 'h5peditor-3d-model-preview-model'
    });

    this.dom = document.createElement('div');
    this.dom.classList.add('h5peditor-3d-model-preview-wrapper');

    const preview = document.createElement('div');
    preview.classList.add('h5peditor-3d-model-preview');
    preview.appendChild(this.model.getDOM());

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('h5peditor-3d-model-button-remove-model');
    deleteButton.addEventListener('click', () => {
      this.callbacks.onDelete(deleteButton);
    });
    this.dom.appendChild(preview);
    this.dom.appendChild(deleteButton);
  }

  /**
   * Get scene DOM.
   * @returns {HTMLElement} Scene DOM.
   */
  getDOM() {
    return this.dom;
  }

  /**
   * Show preview.
   */
  show() {
    this.dom.classList.remove('display-none');
  }

  /**
   * Hide preview.
   */
  hide() {
    this.dom.classList.add('display-none');
  }

  /**
   * Set model.
   * @param {string} src Object file path.
   */
  setModel(src) {
    this.model.setModel(src);
  }
}

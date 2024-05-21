import '@google/model-viewer';
import  Util from '@services/util.js';
import './threed-model.scss';

export default class ThreeDModel {

  constructor(params = {}, callbacks = {}) {
    this.params = Util.extend({}, params);

    this.callbacks = Util.extend({
      onLoad: () => {}
    }, callbacks);

    this.dom = this.buildDOM();
  }

  /**
   * Build DOM.
   * @returns {HTMLElement} DOM.
   */
  getDOM() {
    return this.dom;
  }

  buildDOM() {
    // model-viewer is custom element expected by @google/model-viewer
    const dom = document.createElement('model-viewer');

    dom.classList.add('threed-model');
    if (this.params.className) {
      dom.classList.add(this.params.className);
    }

    dom.setAttribute('camera-controls', '');

    if (this.params.alt) {
      dom.setAttribute('alt', this.params.alt);
    }

    dom.setAttribute('a11y', this.buildA11y(this.params.a11y));

    dom.addEventListener('load', () => {
      this.callbacks.onLoad();
    });

    return dom;
  }

  /**
   * Show.
   */
  show() {
    this.dom.classList.remove('display-none');
  }

  /**
   * Hide.
   */
  hide() {
    this.dom.classList.add('display-none');
  }

  /**
   * Set model source.
   * @param {string} src Source object file path.
   */
  setModel(src) {
    if (typeof src !== 'string') {
      return;
    }

    if (
      !src.endsWith('.gltf') &&
      !src.endsWith('.glb')
    ) {
      return;
    }

    // Set model
    this.dom.setAttribute('src', src);
  }

  updateAspectRatio() {
    const dimensions = this.getDimensions();
    if (!dimensions) {
      return;
    }

    this.dom.style.aspectRatio = `${dimensions.x} / ${dimensions.y}`;
  }

  getDimensions() {
    if (!this.dom.getDimensions) {
      return; // May not be ready yet
    }

    return this.dom.getDimensions();
  }

  buildA11y(params = {}) {
    const a11yProps = [
      'back', 'front', 'left', 'right',
      'lower-back', 'lower-front', 'lower-left', 'lower-right',
      'upper-back', 'upper-front', 'upper-left', 'upper-right',
      'interaction-prompt'
    ];

    const a11yAttributes = {};
    a11yProps.forEach((prop) => {
      if (params[prop]) {
        a11yAttributes[prop] = params[prop];
      }
    });

    // Set the attribute on the DOM element with the new object
    return JSON.stringify(a11yAttributes);
  }
}

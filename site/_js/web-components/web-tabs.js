/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview A component for displaying horizontal tabs.
 */

// Importing the BaseElement class for inheritance and html template literal tag.
import {BaseElement} from './base-element';
import {html} from 'lit-element';

// Importing the generateIdSalt function for generating unique IDs.
import {generateIdSalt} from '../utils/salt';

// Defining the WebTabs class that contains the logic for displaying horizontal tabs.
export class WebTabs extends BaseElement {
  constructor() {
    super();

    // Initializing the _tabPanels array to store the tab panel elements.
    this._tabPanels = [];

    // Binding the onSelect method to the element's context.
    this.onSelect = this.onSelect.bind(this);
  }

  // Called automatically when the element is added to the DOM.
  connectedCallback() {
    super.connectedCallback();

    // Initializing the _id variable with a unique ID for the tabs.
    this._id = `tabs-${generateIdSalt('tabs-')}`;

    // Initializing the _selected variable with the index of the selected tab.
    this._selected = this._getSelectedTabIndex();
  }

  // The onSelect method is called when a selection event is triggered on a tab.
  onSelect(e) {
    const tabIndex = parseInt(e.target.id.split('-').pop(), 10);

    // Checking if the selected tab is different from the current one.
    if (this._selected !== tabIndex) {
      this._select(tabIndex);
    }
  }

  // The _select method is responsible for updating the UI based on the selected tab.
  _select(tabIndex) {
    this._selected = tabIndex;

    // Iterating through the _selectedTabPanels array and updating the attributes of each tab panel.
    this._tabPanels.forEach(tabPanel => {
      const tabPanelId = `${this._id}__tabpanel-${tabPanel.id.split('-').pop()}`;
      const tabId = '#' + tabPanel.getAttribute('aria-labelledby');
      const tab = this.querySelector(tabId);

      if (this._selected !== tabPanelId) {
        tabPanel.setAttribute('hidden', 'hidden');
        tab?.setAttribute('tabindex', '-1');
        tab?.setAttribute('aria-selected', 'false');
      } else {
        tabPanel.removeAttribute('hidden');
        tab?.setAttribute('tabindex', '0');
        tab?.setAttribute('aria-selected', 'true');
      }
    });
  }

  // The _formatTabs method is responsible for formatting the tabs based on the tab panels.
  _formatTabs() {
    return this._tabPanels.map((child, i) => {
      const title = child.getAttribute('title');
      child.removeAttribute('title');

      // Generating unique IDs for the tab and tab panel elements.
      const tabId = `${this._id}__tab-${i}`;
      const tabPanelId = `${this._id}__tabpanel-${i}`;

      // Setting the attributes for the tab panel element.
      child.setAttribute('id', tabPanelId);
      child.setAttribute('role', 'tabpanel');
      child.setAttribute('aria-labelledby', tabId);
      child.setAttribute('tabindex', 0);

      // Checking if the current tab panel is selected and updating the attributes accordingly.
      if (i !== this._selected) {
        child.setAttribute('hidden', 'hidden');
      } else {
        child.removeAttribute('hidden');
      }

      // Returning the formatted tab element.
      return html`<button
        role="tab"
        id="${tabId}"
        aria-selected="${i === this._selected}"
        aria-controls="${tabPanelId}"
        tabindex="${i === this._selected ? 0 : -1}"
        @click="${this.onSelect}"
      >
        ${title}
      </button>`;
    });
  }

  // The _getSelectedTabIndex method is responsible for getting the index of the selected tab.
  _getSelectedTabIndex() {
    const hash = window.location.hash;

    // If there is no hash, the first tab is selected.
    if (!hash) {
      return 0;
    }

    // Finding the target element based on the hash.
    const targetElement = this.querySelector(hash);

    // If the target element is not found, the first tab is selected.
    if (!targetElement) {
      return 0;
    }

    // Finding the tab based on the target element.
    const tab = targetElement.closest('web-tab');

    // If the tab is not found, the first tab is selected.
    if (!tab) {
      return 0;
    }

    // Returning the index of the selected tab.
    return Array.from(this.children).indexOf(tab);
  }

  // The render method is responsible for rendering the tabs and tab panels.
  render

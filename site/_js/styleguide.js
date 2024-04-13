/*
 * Copyright 2022 Google LLC
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License");
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

// Importing custom web components 'enhanced-select' and 'checkbox-group'
import './web-components/enhanced-select';
import './web-components/checkbox-group';

// Importing 'TagPillList' web component from './web-components/tag-pill-list'
import {TagPillList} from './web-components/tag-pill-list';

// Selecting the 'tag-pill-list' element with id 'tag-pill-demo'
const tagPillComponent = document.querySelector('#tag-pill-demo tag-pill-list');

// Selecting the button element within the 'tag-pill-demo' element
const tagPillButton = document.querySelector('#tag-pill-demo button');

// Adding a click event listener to the button
tagPillButton?.addEventListener('click', () => {
  // Checking if the selected 'tagPillComponent' is an instance of 'TagPillList'
  if (!(tagPillComponent instanceof TagPillList)) return;

  // Adding a new tag pill with key 'addition' and value 'Addition' to the existing items
  tagPillComponent.items = [
    ...tagPillComponent.items,
    {
      key: 'addition',
      value: 'Addition',
    },
  ];
});


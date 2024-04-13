/*
 * Copyright 2021 Google LLC
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

declare global {
  // Interface for a single item of authors data
  export interface AuthorsDataItem {
    // The country of the author (optional)
    country?: string;

    // The GitHub username of the author (optional)
    github?: string;

    // The Glitch username of the author (optional)
    glitch?: string;

    // The homepage URL of the author (optional)
    homepage?: string;

    // The URL of the author's image (optional)
    image?: string;

    // The Twitter username of the author (optional)
    twitter?: string;
  }

  // Interface for a collection of authors data
  export interface AuthorsData {
    // A mapping of author names to their corresponding data
    [key: string]: AuthorsDataItem;
  }

  // Interface for a single item in a virtual collection of authors
  export interface AuthorsItem extends VirtualCollectionItem, AuthorsDataItem {}

  // Interface for a virtual collection of authors
  export interface Authors {
    // A mapping of author names to their corresponding item in the virtual collection
    [key: string]: AuthorsItem;
  }
}

// Export an empty object to ensure this file is treated as a module
export {};

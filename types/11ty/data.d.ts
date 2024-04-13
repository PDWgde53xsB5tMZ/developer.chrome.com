/*
 * Copyright 2020 Google LLC
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

// This declare global statement is used to add new properties to the global EleventyData interface
declare global {
  export interface EleventyData extends Partial<FrontMatterData> {
    // The title property is a string that represents the title of the page
    title: string;
    // The locale property is a string that represents the locale of the page
    locale: string;
    // The eleventyComputed property is an optional object that contains functions to compute values based on the data object
    eleventyComputed?: {
      [key: string]: (data: EleventyData) => TODO;
    };
    // The paged property is optional and its type is TODO
    paged?: TODO;
    // The permalink property is optional and can be a string or a boolean
    permalink?: string | boolean;
    // The layout property is a string that represents the layout to use for the page
    layout?: string;
    // The page property is an optional EleventyPage object that contains information about the current page
    page?: EleventyPage;
    // The pagination property is an optional EleventyPagination object that contains information about pagination
    pagination?: EleventyPagination;
    // Any other properties can be added to the EleventyData interface as needed
    [key: string]: TODO;
  }
}

// This empty export statement is used to ensure that the file is treated as a module
export {};

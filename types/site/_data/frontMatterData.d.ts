/*
 * Copyright 2020 Google LLC
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

// Declare a global namespace for adding custom types to the global scope
declare global {
  // Define an interface 'FrontMatterData' that represents the fields in the FrontMatter of posts' Markdown files
  export interface FrontMatterData {
    // The title of the post
    title: string;

    // The layout of the post, optional
    layout?: string;

    // The description of the post, optional
    description?: string;

    // The subhead of the post, optional
    subhead?: string;

    // The date of the post, technically optional but required for practical purposes
    date: Date;

    // The updated date of the post, optional
    updated?: Date;

    // The authors of the post, optional
    authors?: string[];

    // The tags of the post, optional
    tags?: string[];

    // The hero image of the post, optional
    hero?: string;

    // The alt text for the hero image, optional
    alt?: string;

    // The origin trial URL, optional
    origin_trial?: {
      url: string;
    };

    // The permalink of the post, optional
    permalink?: string;

    // The type of the post, optional
    type?: PostTypes;

    // The i18n data of the post, optional
    i18n?: {
      [key: string]: TODO;
    };

    // A flag indicating if the post is a draft, optional
    draft?: boolean;

    // The API for the post, optional
    api?: string;

    // Extra permissions for the post, optional
    extra_permissions?: string[];

    // Extra permissions HTML for the post, optional
    extra_permissions_html?: string;

    // Special permissions HTML for the post, optional
    special_permissions_html?: string;

    // A flag indicating if the post has a warning, optional
    has_warning?: string;

    // The following properties are added dynamically
    locale: string;

    // The URL

/*
 * Copyright 2023 Google LLC
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

// Declare global interfaces for FuguProject and FuguShowcase
declare global {
  // FuguProject interface with the following properties:
  export interface FuguProject {
    // A timestamp string
    timestamp: string,
    // The application's URL
    appURL: string,
    // The source code URL
    sourceURL: string,
    // An array of used APIs
    usedAPIs: FuguAPI[],
    // An optional screenshot string
    screenshot?: string,
  }

  // FuguShowcase interface with the following properties:
  export interface FuguShowcase {
    // A timestamp string
    timestamp: string,
    // The application's URL
    appURL: string,
    // The source code URL
    sourceURL: string,
    // An array of used APIs
    usedAPIs: FuguAPI[],
    // A required screenshot string
    screenshot: string,
    // The title of the showcase
    title: string,
    // A description of the showcase
    description: string,
    // Additional metadata
    meta: any,
    // A boolean indicating if the app is an Electron app
    isElectronApp: boolean,
  }

  // FuguAPI interface with the following properties:
  export interface FuguAPI {
    // The name of the API
    name: string,
    // The URL of the API
    url: string,
  }
}

// Empty export to

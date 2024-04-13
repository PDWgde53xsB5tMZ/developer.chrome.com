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

// Declare global interfaces for EventsCollectionItem, EventSessionCollectionItem, and EventPersonCollectionItem
declare global {
  // An item in the EventsCollection, representing an event with various properties
  export interface EventsCollectionItem {
    summary: string, // A brief summary of the event
    date: string, // The date of the event
    image: string, // A URL for the event's image
    externalUrl: string, // A URL for more information about the event
    sessions: EventsSessionCollectionItem[], // An array of sessions in the event
    location: string, // The location of the event
    id: string, // A unique identifier for the event
    title: string, // The title of the event
    isPastEvent: boolean // Whether the event has already occurred
  }

  // An item in the EventSessionCollection, representing a session with various properties
  export interface EventSessionCollectionItem {
    title: string, // The title of the session
    description: string, // A description of the session
    type: string, // The type of the session (e.g., talk, workshop, etc.)
    topics: string[], // An array of topics covered in the session
    slidesUrl: string, // A URL for the session's slides
    videoUrl: string, // A URL for the session's video recording
    image?: string, // An optional URL for the session's image
    speaker?: EventPersonCollectionItem, // An optional speaker for the session
    participants?: EventPersonCollectionItem[] // An optional array of participants in the session
  }

  // An item in the EventPersonCollection, representing a person with various properties
  export interface EventPersonCollectionItem {
    image

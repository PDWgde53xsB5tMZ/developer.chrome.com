// This is a global interface that extends the EleventyCollectionObject interface
declare global {
  // This interface defines the shape of an object that contains a collection of Eleventy content items
  export interface EleventyCollectionObject {
    // This is a reference to all items in the collection
    all: EleventyCollectionItem[];

    // This is a reference to all items in the collection, in the order they were added
    items: EleventyCollectionItem[];

    // This is the length of the collection (i.e., the number of items it contains)
    length: number;

    // This is an index signature that allows you to access items in the collection by tag name
    [tag: key]: EleventyCollectionItem[];

    // This method returns all items in the collection, in whatever order they were added
    getAll: () => EleventyCollectionItem[];

    // This method returns all items in the collection, sorted in ascending order by date, with a filename tiebreaker
    getAllSorted: () => EleventyCollectionItem[];

    // This method returns all items in the collection that have a specific tag
    getFilteredByTag: (tagName: string) => EleventyCollectionItem[];

    // This method returns all items in the collection that have specific tags
    getFilteredByTags: (...tagNames: string[]) => EleventyCollectionItem[];

    // This method returns all items in the collection that match a specific glob pattern
    getFilteredByGlob: (glob: string) => EleventyCollectionItem[];
  }
}

// This empty export is necessary to keep the file a module
export {};

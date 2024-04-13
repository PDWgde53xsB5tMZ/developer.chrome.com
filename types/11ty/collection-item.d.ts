/**
 * The `EleventyCollectionItem` interface extends the built-in `CollectionItem` interface in Eleventy,
 * adding several properties that are specific to the user's project.
 */
declare global {
  /**
   * This interface defines the shape of an item in an Eleventy collection.
   */
  export interface EleventyCollectionItem extends CollectionItem {
    /**
     * The full path to the source input file (including the path to the input directory).
     * This property is useful for permalinks and other file-related operations.
     */
    inputPath: string;

    /**
     * Mapped from the input file name, useful for permalinks. Read more about [`fileSlug`](https://www.11ty.dev/docs/data-eleventy-supplied/#fileslug).
     * This property is used to generate the URL for this piece of content.
     */
    fileSlug: string;

    /**
     * Mapped from the input file path. This property is useful for organizing content into directories.
     */
    filePathStem: string;

    /**
     * The full path to the output file to be written for this content.
     * This property is used to generate the final output files for the user's site.
     */
    outputPath: string;

    /**
     * URL used to link to this piece of content.
     * This property is used to generate links to the user's content.
     */
    url: string;

    /**
     * The resolved date used for sorting. Read more about [Content Dates](https://www.11ty.dev/docs/dates/).
     * This property is used to sort content by date.
     */
    date: Date;

    /**
     * All data for this piece of content (includes any data inherited from layouts).
     * This property is used to access data associated with this piece of content.
     */
    data: EleventyData;

    /**
     * The rendered content of this template. This does not include layout wrappers.
     * This property is used to access the content of this piece of content.
     */
    templateContent: string;

    /**
     * @UNDOCUMENTED
     *
     * This property is not documented in the Eleventy documentation, and its purpose is unclear.
     */
    template: {
      [key: string]: TODO;
    };
  }
}

// This empty export is used to ensure that this file is treated as a module.
export {};

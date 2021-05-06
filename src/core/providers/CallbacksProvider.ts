export class CallbacksProvider {
  scrapeLink: (
    url: string
  ) => Promise<{
    base: string;
    image: string;
    title: string;
    favicon: string;
    url: string;
  }>;
  uploadFiles: (
    files: FileList
  ) => Promise<{
    url: string;
    meta: Record<string, unknown>;
  }>;
  constructor(props: Callbacks) {
    this.scrapeLink = props.scrapeLink;
    this.uploadFiles = props.uploadFiles;
  }
}

export type Callbacks = {
  scrapeLink: (
    url: string
  ) => Promise<{
    base: string;
    image: string;
    title: string;
    favicon: string;
    url: string;
  }>;
  uploadFiles: (
    files: FileList
  ) => Promise<{
    url: string;
    meta: Record<string, unknown>;
  }>;
};

export const mockCallbacks: Callbacks = {
  async scrapeLink(url: string) {
    return {
      url: "https://join.lumastic.com/stories/surfing",
      base: "https://join.lumastic.com",
      image: "https://join.lumastic.com/assets/HeroImage.png",
      title: "Why surfing (and everything) is art.",
      favicon: "https://cdn.lumastic.com/media/v1/favicons/favicon-196x196.png"
    };
  },
  async uploadFiles(files: FileList) {
    return {
      url: "https://join.lumastic.com/assets/HeroImage.png",
      meta: { alt: "This is an image alt" }
    };
  }
};

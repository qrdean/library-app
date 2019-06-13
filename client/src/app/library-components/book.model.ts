export class BookModel {
  public lccn: string;
  public isbn: string;
  public title: string;
  public authors: string[];
  public publishDate: string;
  public available: boolean;

  constructor(
    lccn: string,
    isbn: string,
    title: string,
    authors: string[],
    publishDate: string,
    available: boolean
  ) {
    this.lccn = lccn;
    this.isbn = isbn;
    this.title = title;
    this.authors = authors;
    this.publishDate = publishDate;
    this.available = available;
  }
}

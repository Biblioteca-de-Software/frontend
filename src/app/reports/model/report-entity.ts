export class ReportEntity {
  constructor(
    public id: number,
    public title: string,
    public details: string
  ) {

    this.id = id;
    this.title = title;
    this.details = details;
  }

}

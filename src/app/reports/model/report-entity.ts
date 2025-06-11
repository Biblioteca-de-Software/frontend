export class ReportEntity {
  constructor(
    public id: number,
    public title: string,
    public date: Date,
    public details: string
  ) {

    this.id = id;
    this.title = title;
    this.date = new Date();
    this.details = details;
  }

}

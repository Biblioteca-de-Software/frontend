export class ReportEntity {

  id?: number;
  title: string;
  description: string;


  constructor(
    id?: number,
    title?: string,
    description?: string
  ) {

    this.id = id || 0;
    this.title = title || "";
    this.description = description || "";
  }

}

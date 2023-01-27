export class IdAndName {
  static from(id: string, name: string): IdAndName {
    const data = new IdAndName();

    data._id = id.trim();
    data.name = name.trim();

    return data;
  }

  _id: string;
  name: string;
}

export class UpdateSearchWordDto {
  id: number;
  searchWord: string[];
  constructor(props: UpdateSearchWordDto) {
    this.searchWord = props.searchWord;
    this.id = props.id;
  }
}

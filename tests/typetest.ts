import firstBy from "../thenBy.module";

class User {
    name: string;
    length: number;
}
let items: User[] = [
    {name: "Tony", length: 167},
    {name: "Elsa", length: 159},
    {name: "Bert", length: 192},
];

console.log(items.sort(
    firstBy((a, b) => a.length - b.length)
      .thenBy(v => v.name.length)
      .thenBy("name", {direction: -1})
));
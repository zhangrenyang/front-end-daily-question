const list = {
  objects: [
    { name: "1. 什么是原型链", content: "原型链" },
    { name: "2. 什么是闭包", content: "闭包" },
    { name: "3. 什么是xxx", content: "xxx" },
  ],
};
const client = {
  list: () => list,
  get: (i: number) => list.objects[i],
};
export default client;

export interface User {
  id: string;
  name: string;
  username: string;
  publicKey: string;
}

export const getDummyUser = (): User => ({
  id: "1",
  name: "Prathamesh Mutkure",
  username: "",
  publicKey: "",
});

export interface User {
  id: string;
  name: string;
  username: string;
  publicKey: string;
  privateKey?: string;
}

export const getDummyUser = (publicKey: string, privateKey: string): User => ({
  id: "1",
  name: "Prathamesh Mutkure",
  username: "",
  publicKey,
  privateKey,
});

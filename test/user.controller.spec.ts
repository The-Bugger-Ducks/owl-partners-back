
describe("User", () => {
  it("should be able to create a user", () => {
    const user = {
      name: "Gabriel",
      email: "email@email.com",
      password: '123456'
    };

    expect(user).toBeTruthy();
  });
});

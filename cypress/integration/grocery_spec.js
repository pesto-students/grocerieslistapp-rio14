context("Grocery Component", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get("#userName").type("Mahatma Gandhi");
    cy.get("#loginButton").click();
  });

  it("should show 'My Groceries List' on the screen", () => {
    cy.get("#heading").should("contain", "My Groceries List");
  });

  it("should be able to add grocery item", () => {
    cy.get("#myGrocery").type("item1").should("have.value", "item1");
    cy.get("#add")
      .click()
      .should(() => {
        expect(localStorage.getItem("users")).to.eq(
          '[{"name":"Mahatma Gandhi","groceries":["item1"]}]'
        );
      });
  });
});

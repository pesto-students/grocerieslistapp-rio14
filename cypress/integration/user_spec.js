describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://127.0.0.1:5500/");
  });
});

context("User Component", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("should be able to submit userName", () => {
    cy.get("#userName")
      .type("Mahatma Gandhi")
      .should("have.value", "Mahatma Gandhi");

    cy.get("#loginButton")
      .click()
      .should(() => {
        expect(localStorage.getItem("currentUser")).to.eq('"Mahatma Gandhi"');
      });
  });
});

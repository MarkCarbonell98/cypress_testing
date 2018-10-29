describe("Input form", () => {
  beforeEach(() => {
    cy.seedAndVisit([])
  })
  it("focuses input on load", () => {

    cy.focused()
      .should("have.class", "new-todo");
  })

  it("accepts input", () => {

    cy.get(".new-todo")
      .type("feed the cat")
      .should("have.value", "feed the cat")
  })

  // cypress can simulate xhr and http request to simulate the backend even if it hasnt been created yet
  context("Form submission", () => {
    beforeEach(() => {
      cy.server()
    })
    it("adds a new todo on submit", () => {
      const testText = "Comprame este :P"
      cy.route("POST", "/api/todos", {
        name: testText, 
        id: 1,
        isComplete: false,
      })
      cy.get(".new-todo")
        .type(testText)
        // this code makes the enter keyword be entered
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", testText)
    })

    it("Shows an error message on a failed submission", () => {
      cy.route({
        url: "/api/todos",
        method: "POST", 
        status: 500, 
        response: {}
      })

      cy.get(".new-todo")
        .type("test{enter}")

      cy.get(".todo-list li")
        .should("not.exist")

      cy.get(".error")
      .should("be.visible")  

    })
  })
})
describe("List items", () => {
    beforeEach(() => {
        cy.seedAndVisit();
    })

    it("properly displays completed items", () => {
        cy.get(".todo-list li")
            .filter(".completed")
            .should("have.length", 1)
            .and("contain", "arepas")
            .find(".toggle")
            .should("be.checked")
    })

    it("shows remaining todos in the footer", () => {
        cy.get(".todo-count")
            .should("contain", 3);
    })

    it("removes a todo", () => {
        cy.route({
            url: "/api/todos/1", 
            method: "DELETE", 
            status: 200, 
            response: {}
        })
        console.log(Cypress)

        cy.get(".todo-list li").as("list") //cy is asynch, therefore you cant just use the constant as a value

        cy.get("@list")
            .first()
            .find(".destroy")
            //invoke makes the element take the styles described as arg
            .invoke("show")
            .click({force: true})

        cy.get("@list")
            .should("have.length", 3)
            .and("not.contain", "pan")
    })

    it.only("Marks incomplete items as complete", () => {
        cy.fixture("todos")
            .then(todos => {
                const target = Cypress._.head(todos);
                cy.route(
                    "PUT", 
                    `/api/todos/${target.id}`, Cypress._.merge(target,{isComplete: true})
                )
            })

        cy.get(".todo-list li")
            .first()
            .as("first-todo")

        cy.get("@first-todo")
            .find(".toggle")
            .click()
            .should("be")

        cy.get("@first-todo")
            .should("have.class", "completed")

        cy.get(".todo-count")
            .should("contain", 2)
    })

})
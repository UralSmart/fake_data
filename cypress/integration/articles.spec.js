import { login } from 'cypress/support/shared';
import { faker } from '@faker-js/faker';

function generateFakeArticle() {

    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        tags: [
            faker.word.adjective(),
            faker.word.adjective(),
            faker.word.adjective()
        ]
    };
}

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').should('be.visible').as('appHeader');
        login();
    });

    it('should do publish article', () => {

        // open editor
        cy.get('@appHeader').find('a[href$="editor"]').click();
        cy.url().should('include', '/#/editor');

        cy.get('.editor-page').as('addArticlePage');

        cy.get('@addArticlePage').find('form').should('be.visible').as('addArticleForm');

        const article = generateFakeArticle();

        // fill and submit form
        cy.get('@addArticleForm').find('input[ng-model$=title]').type(article.title);
        cy.get('@addArticleForm').find('input[ng-model]')
    })
})
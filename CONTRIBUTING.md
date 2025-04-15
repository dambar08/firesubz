# Contributing to FireSubz

## Introduction

Welcome! We appreciate your interest in contributing to FireSubz, a subscription management application designed to help users easily track and manage their subscriptions. This guide outlines the steps and guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs and Suggesting Features

-   If you encounter a bug or have a suggestion for a new feature, please open an issue. Clearly describe the bug or feature request, including steps to reproduce the bug (if applicable) and any relevant context. You can submit issues or suggestions on the [GitHub issues page](https://github.com/dambar08/firesubz/issues).


### Forking the Repository

1.  Fork the repository on GitHub.
2.  Clone your forked repository to your local machine:
```
bash
    git clone <your-forked-repository-url>
    cd firesubz
    
```
### Creating Branches

-   Create a new branch for your contribution. Use a descriptive name that reflects the purpose of your changes (e.g., `feat/add-subscription-form`, `fix/bug-in-dashboard`).
```
bash
    git checkout -b <your-branch-name>
    
```
### Writing Commit Messages

-   Write clear and concise commit messages that explain the changes you've made. Follow these guidelines:
    -   Use the present tense (e.g., "Add subscription form" instead of "Added subscription form").
    -   Start with a brief summary (50 characters or less).
    -   Provide more detailed explanations in the body of the message, if necessary.
    -   Use keywords like `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore` to categorize your commits.

    Example:
```
    feat: Add subscription creation form

    This commit implements a form for creating new subscriptions.
    It includes input fields for name, price, category, and renewal date,
    with client-side validation using zod.
    
```
### Submitting Pull Requests

1.  Push your changes to your forked repository:
```
bash
    git push origin <your-branch-name>
    
```
2.  Open a pull request (PR) on the main repository.
3.  Provide a clear title and description for your PR, summarizing the changes and their purpose.
4.  If your PR addresses an existing issue, reference the issue number in the description (e.g., "Closes #123").
5.  Be prepared to respond to feedback and make revisions to your changes.

### Code Style Guidelines

-   This project uses Prettier for code formatting. Make sure to run Prettier before submitting your changes to ensure consistent code style.
```
bash
    npm run format:write
    
```
### Testing Guidelines

-   If your changes introduce new functionality or modify existing behavior, include relevant tests to ensure the code works as expected.
-   Run the existing test suite to confirm that your changes haven't introduced any regressions.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please review our [Code of Conduct](CODE_OF_CONDUCT.md) (if available) to understand our expectations for respectful and professional conduct.

## Contact

If you have any questions or need help with contributing, feel free to reach out on our [Discord server](<discord-server-link, if available>) or contact us at <email-address, if available>.
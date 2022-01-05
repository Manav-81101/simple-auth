# Gatsby Authentication Demo

This is a simplified demo to show how an authentication workflow is implemented in Gatsby.

The short version is:

- Authenticated routes are allowed as client-only
- Logged out users are redirected to the login page if they attempt to visit private routes
- Logged in users will see their private content

## A Note About Security

This example is less about creating an example of secure, production-ready authentication, and more about showing Gatsby's ability to support dynamic content in client-only routes.s
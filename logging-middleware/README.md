## Logging Middleware
This module provides a centralized logging utility for the frontend application.
It sends structured logs to the evaluator’s logging API with authentication using a Bearer token.

The logger is used across the app to track:

API calls
Errors
Application flow events
Debug information
Critical failures

Log Structure

Each log request must follow this format:

{
  "stack": "frontend",
  "level": "info | debug | warn | error | fatal",
  "package": "api | ui | state | auth | etc",
  "message": "short description (max 48 characters)"
}
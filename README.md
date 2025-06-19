# Nelson Development - Junior Developer Task

A simple API endpoint that sorts characters in a string alphabetically.

## Features

- **String Sorting API**: POST endpoint that accepts a string and returns it sorted alphabetically
- **Web Interface**: Simple HTML form to test the API
- **Validation**: Integration with validation endpoint for testing

## API Endpoint

- **URL**: `/api/sort-string`
- **Method**: POST
- **Content-Type**: application/json
- **Request Body**: `{ "data": "your_string_here" }`
- **Response**: `{ "word": "sorted_string" }`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Deploy to Vercel:
   ```bash
   npm run deploy
   ```

## Usage

1. Open the web interface
2. Enter a test string
3. Enter your API URL (e.g., `https://your-app.vercel.app/api/sort-string`)
4. Click "Test API" to test your endpoint
5. Use the validation form to submit your endpoint for review

## Example

**Request:**
```json
{
  "data": "hello"
}
```

**Response:**
```json
{
  "word": "ehllo"
}
```

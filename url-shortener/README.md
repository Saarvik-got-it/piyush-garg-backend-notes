# URL Shortener

- Design a URL shortener service that takes a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.

- Also keep track of the total views/clicks on the URL

## Routes

**POST /URL** - Generates a new short URL and returns the shortened URL in the format **_example.com/random-id_**

**GET /:id** - Redirects the user to the original URL

**GET /URL/analytics/:id** - Returns the clicks for the provided short id

# Architecture and Dependencies

**_nanoid_** - Url Shortener Service

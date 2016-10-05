# API Tests

# test GET on /api/bugs: returns array of bugs
curl -v localhost:3000/api/bugs 

# Same test with a If-None-Match that matches a previous etag. This will return a 304.
curl -v --header 'If-None-Match: W/"b5-F1b7cwQ6h9O04csif+Wqkw"' localhost:3000/api/bugs 

# Test POST to create a new bug and return it.
# Won't work if type is not set to */* in bodyParser.
curl -v \
  --data '{"priority":"4","status":"Open","owner":"Pieta","decs":"New bug added via api"}' \
  http://localhost:3000/api/bugs

# Will work because the content-type is specified as json data.
curl -v \
  --header 'Content-Type: application/json' \
  --data '{"priority":"4","status":"Open","owner":"Pieta","decs":"New bug added via api"}' \
  http://localhost:3000/api/bugs
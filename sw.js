import routing from "workbox-routing";

// regex to be used when validating incoming requests
const helloRegex = /hello-world.*/;
/**
 * Constructs Response to be sent, where body is a JSON object containing *message* and *method*.
 * @param {*} message message to be sent to the client
 * @param {*} method type of the request coming from client
 */
const constructResponse = (message, method) => new Response(JSON.stringify({ message, method }));
// register GET method request handler
routing.registerRoute(helloRegex, () => constructResponse("Hello world!", "GET"), "GET");
// register POST method request handler
routing.registerRoute(
    helloRegex,
    // parse JSON body and return Response
    ({ event }) => event.request.json().then(body => constructResponse(`Client says: ${body}`, "POST")),
    "POST"
);

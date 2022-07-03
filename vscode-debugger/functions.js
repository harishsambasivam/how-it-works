function parseBody(requestObject) {
    console.log("invoking parseBody");
    const { body } = requestObject;
    return body;
}

function foo(requestObject) {
    console.log("invoking foo");
    const body = parseBody(requestObject);
    return body;
}

foo({"body":"hello world"});
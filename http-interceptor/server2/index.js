const { createInterceptor } = require("@mswjs/interceptors");
const {interceptXMLHttpRequest}= require("@mswjs/interceptors/lib/interceptors/XMLHttpRequest");
const {interceptClientRequest} = require("@mswjs/interceptors/lib/interceptors/ClientRequest");

function _instrumentHTTPTraffic() {
    const interceptor = createInterceptor({
      resolver: () => {}, // Required even if not used
      modules: [interceptXMLHttpRequest, interceptClientRequest],
   });

   interceptor.on("request", _handleHttpRequest);

//    interceptor.on("response", _handleHttpResponse);

   interceptor.apply();
}

function _handleHttpRequest(request) {
   const url = request.url.toString();
   const method = String(request.method);
   const headers = request.headers.raw();

   const requestEvent = {
      headers,
      method,
      url: request.url.toString(),
      body: request.body,
   };


   // Intentionally not waiting for a response to avoid adding any latency with this instrumentation
   doSomethingWithRequest(requestEvent);
}

_instrumentHTTPTraffic();

function doSomethingWithRequest(req){
    req.headers["x-correlation-id"] = "dodo";
    console.log(req.headers);
}

const axios = require('axios');

axios.get("http://localhost:3000").then(res =>  console.log(res.data)).catch(err => console.error(err))
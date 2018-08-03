// Use the window load event to keep the page load performant
window.addEventListener("load", () => {
    // Check that service workers are registered
    if ("serviceWorker" in navigator) {
        const response = document.getElementById("response");
        /**
         * Makes HTTP request to the specified url with the given config. If config is *null*, *GET* method is assumed.
         * @param {*} url string url where to make request
         * @param {*} config optional config that might contain body, method etc.
         */
        const request = (url, config) => {
            fetch(encodeURI(url), config)
                .then(response => response.json())
                .then(data => (response.textContent = `Response: "${data.message}". Method: "${data.method}".`))
                .catch(err => console.log(err));
        };
        // our SW endpoint
        const url = "/hello-world";

        // register SW
        navigator.serviceWorker.register("./sw.js");
        // add event listener for GET request
        document.getElementById("sayHello").addEventListener("click", () => request(url, null));
        // add evevnt listener for POST request
        document.getElementById("postBody").addEventListener("click", () =>
            // extract body from the input field
            request(url, { body: JSON.stringify(document.getElementById("body").value), method: "POST" })
        );
    } else {
        // SW are not supported, display message
        document.querySelector("body").innerHTML = `Service workers are not supported by your browser.
        <br/>
        Check out <a href="https://caniuse.com/#feat=serviceworkers">this url</a> for compatability table.`;
    }
});

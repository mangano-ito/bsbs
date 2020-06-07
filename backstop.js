module.exports = {
    "id": "my test",

    "scenarios": [
        {
            "label": "google-top",
            "url": "https://www.google.com/?hl=en",
            "referenceUrl": "https://www.google.co.jp/?hl=ja",
            "readySelector": "input[name='q']",
            "selectors": [
                "#hplogo",
                "#searchform"
            ],
            "removeSelectors": [
                "input[name='btnI']"
            ],
            "fillSelectors": [
                "input[name='btnK']"
            ]
        }, 
        {
            "label": "google-search",
            "url": "https://www.google.com/?hl=en",
            "referenceUrl": "https://www.google.co.jp/?hl=ja",
            "readySelector": "input[name='q']",
            "selectors": [
                "#top_nav",
                "#appbar",
            ],
            "keyPressSelectors": [
                {
                    "selector": "input[name='q']",
                    "keyPress": "Backstop + BrowserStack awesome"
                },
            ], 
            "clickSelector": "input[name='btnK']",
            "postInteractionWait": 100,
            "removeSelectors": [
                "#hdtb-tls",
            ]
        }, 
    ]
};

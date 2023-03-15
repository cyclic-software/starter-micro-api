var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);
<script src="https://testorgcom-2a-dev-ed.lightning.force.com/lightning/lightning.out.js"></script>
    <script>
        $Lightning.use("c:LanguageTranslationApp",    // name of the Lightning app
            function() {                  // Callback once framework and app loaded
                $Lightning.createComponent(
                    "c:CalenderCmp", // top-level component of your app
                    { },                  // attributes to set on the component when created
                    "lightningLocator",   // the DOM location to insert the component
                    function(cmp) {
                        // callback when component is created and active on the page
                    }
                );
            },
            'https://testorgcom-2a-dev-ed.lightning.force.com/'  // Site endpoint
        );
    </script>

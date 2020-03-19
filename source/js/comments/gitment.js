(function () {
    var newGitment = 'https://imsun.github.io/gitment/dist/gitment.browser.js';
    var oldGitment = 'imsun.github.io/gitment/dist/gitment.browser.js';

    var replaceScript = function (script, src) {
        //
        //  Make redirected script
        //
        var newScript = document.createElement('script');
        newScript.src = newGitment + src.replace(/.*?(\?|$)/, '$1');
        //
        //  Move onload and onerror handlers to new script
        //
        newScript.onload = script.onload;
        newScript.onerror = script.onerror;
        script.onload = script.onerror = null;
        //
        //  Move any content (old-style configuration scripts)
        //
        while (script.firstChild) newScript.appendChild(script.firstChild);
        //
        //  Copy script id
        //
        if (script.id != null) newScript.id = script.id;
        //
        //  Replace original script with new one
        //
        script.parentNode.replaceChild(newScript, script);
    };

    if (document.currentScript) {
        var script = document.currentScript;
        replaceScript(script, script.src);

    } else {
        //
        // Look for current script by searching for one with the right source
        //
        var n = oldGitment.length;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            var src = (script.src || '').replace(/.*?:\/\//, '');
            if (src.substr(0, n) === oldGitment) {
                replaceScript(script, src);
                break;
            }
        }
    }

})();

// Função simples de criptografia (substitui cada letra por outra)
function criptografar() {
    const inputText = document.getElementById("inputText").value;
    let result = '';
    for (let i = 0; i < inputText.length; i++) {
        result += String.fromCharCode(inputText.charCodeAt(i) + 3); // Desloca a letra por 3 posições na tabela ASCII
    }
    document.getElementById("resultText").value = result;
}

// Função de descriptografia (reverte a criptografia)
function descriptografar() {
    const inputText = document.getElementById("inputText").value;
    let result = '';
    for (let i = 0; i < inputText.length; i++) {
        result += String.fromCharCode(inputText.charCodeAt(i) - 3); // Desloca a letra de volta por 3 posições na tabela ASCII
    }
    document.getElementById("resultText").value = result;
}

// Função para copiar o texto da área de resultado
function copiarTexto() {
    const resultText = document.getElementById("resultText");
    resultText.select();
    document.execCommand("copy");
    alert("Texto copiado!");
}

if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                var parent = elem.parentElement || head;
                parent.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
            console.log('Live reload enabled.');
            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
        }
    })();
}
else {
    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

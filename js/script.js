window.onload = init;
var domande = [];


//window.location.href -> info sull'indirizzo attuale del sito e server
var indirizzo = window.location.href + "server/";

function init(){
    let ris = fetch(indirizzo+"domande.php", {method:'GET'});
    //Aspettiamo la risposta
    ris.then(async function(dati){
        //Leggiamo i dati della risposta e li convertiamo in json => chiamata asincrona
        domande = await dati.json();
        let div = document.getElementById("divDomande");

        for(let j in domande){
            let domanda = document.createElement("div");
            domanda.innerHTML = domande[j].testo;
            for(let i in domande[j].risp){
                let radio = document.createElement("div");
                radio.innerHTML = `
                    <input type='radio' value='${domande[j].risp[i].cod}' name='${domande[j].n}' />
                    ${domande[j].risp[i].desc}<br>
                    `;
                domanda.appendChild(radio);
            }
            div.appendChild(domanda);
        }
    });

    document.getElementById("btnControlla").addEventListener("click", controlla.bind(document.getElementById("btnControlla")));
}

function controlla(){
    console.log(this);
    let risposte = document.querySelectorAll("input:checked");
    if(risposte.length == domande.length){
        let contErrate = 0;
        for(let risposta of risposte){
            let prova = domande[risposta.name].risp[risposta.value];
            if(!domande[risposta.name].risp[risposta.value].corretta){
                contErrate++;
            }
        }
        alert("Hai sbagliato "+ contErrate+" risposte");

    }else{
        alert("Attenzione, non hai risposto a tutte le domande!");
    }
}

function premuto(evento){
    console.log(evento);
}
let quantityOfCards = document.getElementById("quantityOfCards");
let minimunNumber = document.getElementById("minimunNumber");
let maximunNumber = document.getElementById("maximunNumber");
let generateCards = document.getElementById("generateCards");
let printCards = document.getElementById("printCards");
let cardContainer = document.getElementById("cardContainer");
let colsNum = document.getElementById("colsNum");
let rowsNum = document.getElementById("rowsNum");

function cardToHTML(card) {
    let result = "<table>";
    for(let i = 0; i < card.length; i++) {
        result += "<tr>";
        for(let j = 0; j < card[i].length; j++) {
            result += "<td>" + card[i][j] + "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

function makeCards() {
    cardContainer.innerHTML = "";

    for(let i = 0; i < quantityOfCards.value; i++) {
        let excludedNums = [];
        let card = [];
        
        for(let j = 0; j < rowsNum.value; j++) {
            let row = [];

            for(let k = 0; k < colsNum.value; k++) {
                let num, validNum = false;

                while(!validNum) {
                    validNum = true;
                    num = Math.floor(Math.random() * (maximunNumber.value - minimunNumber.value + 1)) + parseInt(minimunNumber.value);

                    if (excludedNums.includes(num)) {
                        validNum = false;
                    }
                }

                excludedNums.push(num);
                row.push(num);
            }

            card.push(row);
        }

        cardContainer.innerHTML += cardToHTML(card);
    }
}

function printBingo() {
    // Create a new iframe for printing
    let printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = 'none';
    document.body.appendChild(printFrame);

    let printDocument = printFrame.contentDocument || printFrame.contentWindow.document;
    let printContents = document.getElementById("cardContainer").innerHTML;

    // Write the content to the iframe document
    printDocument.open();
    printDocument.write(`
        <html>
            <head>
                <title>Print Bingo Cards</title>
                <style>
                    body {
                        font-family: Inter, sans-serif;
                    }
                    table {
                        border-collapse: collapse;
                        border: 0;
                        margin-bottom: 20px;
                        width: 45%;
                        display: inline;
                        float: left;
                    }
                    td {
                        padding: 12px;
                        text-align: center;
                        font-weight: 400;
                        font-size: 20px;
                        border: 3px solid #333;
                    }
                    table {
                        page-break-inside: avoid;
                    }
                </style>
            </head>
            <body>
                ${printContents}
            </body>
        </html>
    `);
    printDocument.close();

    // Print the iframe content
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

    // Remove the iframe after printing
    document.body.removeChild(printFrame);
}

generateCards.addEventListener("click", (e) => {
    makeCards();
});

printCards.addEventListener("click", (e) => {
    printBingo();
});
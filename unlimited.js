let allGuesses = [];

function addRow(country, score) {
    console.log(`score: ${score} | country: ${country}`);
    const gridContainer = document.getElementById("gridContainer");
    gridContainer.innerHTML = ""; // Clear previous content
    allGuesses.push([score, country]);
    allGuesses.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < allGuesses.length; i++) {
        const newRow = document.createElement("div");
        const scoreFraction = (data.length - allGuesses[i][0]) / data.length;
        newRow.classList.add("grid-item");
        newRow.textContent = `${allGuesses[i][0]} ${allGuesses[i][1]}`;
        let red = 0;
        let green = 0;
        if (scoreFraction <= 0.5) {
            green = Math.floor(scoreFraction * 510);
            red = 255;
        } else {
            red = Math.floor((1 - scoreFraction) * 510);
            green = 255;
        }

        newRow.style.background = `linear-gradient(to right, rgb(${red}, ${green}, 0) ${scoreFraction * 100}%, white ${scoreFraction * 100}%)`;
        newRow.style.padding = "20px";
        newRow.style.marginTop = "5px";
        newRow.style.border = "1px solid black";
        newRow.style.borderRadius = "10px";
        gridContainer.appendChild(newRow);
    }
}

function rgbToHex(r, g, b) {
    var redHex = r.toString(16).padStart(2, '0');
    var greenHex = g.toString(16).padStart(2, '0');
    var blueHex = b.toString(16).padStart(2, '0');
    return "#" + redHex + greenHex + blueHex;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////

function isNumber(input) {
    // regular expression patterns
    const integerPattern = /^\d+$/;
    const decimalPattern = /^\d+\.\d+$/;
    const commaDecimalPattern = /^\d{1,3}(,\d{3})*(\.\d+)?$/;

    if (integerPattern.test(input) || decimalPattern.test(input) || commaDecimalPattern.test(input)) {
        return true;
    } else {
        return false;
    }
}

function stringTo2DList(inputString) {
    const lines = inputString.split('\n');
    const result = [];
    for (let line of lines) {
        line = line.toLowerCase(); // Convert line to lowercase
        const words = line.split(/\s+/);
        for (let i = 1; i < words.length; i++) {
            if (!(isNumber(words[i]))) {
                words[0] += ` ${words[i]}`
                words.splice(i, 1);
                i--;
            }
        }
        // random fix for bug I can't explain
        if (words[0] == "afghanistan ") {
            words[0] = "afghanistan";
        }
        result.push(words);
    }

    console.log(result);
    return result;
}


function getCountryIndex (countryName) {
    return data.findIndex(country => country[0] === countryName.toLowerCase());
}

function getCountryScoreIndex (countryName) {
    return scores.findIndex(country => country[0] === countryName.toLowerCase());
}

function scoresList(relateIndex) {
    console.log(relateIndex)
    let scores = [];
    for (let params of data) {
        dist = 0;
        for (let i = 2;i < params.length;i++) {
            dist += Math.abs(parseFloat(params[i]) - parseFloat(data[relateIndex][i]));
        }
        scores.push([params[0], dist]);
    }
    // Sort the scores array based on the dist variable (index 1)
    scores.sort((a, b) => a[1] - b[1]);

    console.log(scores);
    return scores;
}

function isCountry(countryName) {
     // Check if the countryName exists in allGuesses array
     const existingGuess = allGuesses.find(guess => guess[1].toLowerCase() === countryName.toLowerCase());
     if (existingGuess) {
         alert(`${countryName} has already been guessed.`);
         return false;
     }

    // Assuming data is defined outside of this function
    for (let params of data) {
        if (params[0].toLowerCase() == countryName.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function startGame() {
    while (true) {
        const nextGuess = prompt("guess a country: ")
        if (isCountry(nextGuess)) {
            console.log(`valid guess of , the distance of your guess was ${getCountryScoreIndex(nextGuess)}`);
        } else {
            console.log(`${nextGuess} is not a valid guess of a country`);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector('.input');
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const countryName = input.value.trim(); // Get the trimmed value of the input
            input.value = "";
            if (isCountry(countryName)) {
                addRow(countryName , getCountryScoreIndex(countryName));
            } else {
                alert(`${countryName} is not a valid guess of a country`);
            }
        }
    });
});


// Example usage:
const inputString = `Afghanistan 31,410,000 0.1 99.7 0.1 0.1 0.1 0.1 0.1 0.1 
Albania 3,200,000 18.0 80.3 1.4 0.1 0.1 0.1 0.2 0.1
Algeria 35,470,000 0.2 97.9 1.8 0.1 0.1 0.1 0.1 0.1
American Samoa 70,000 98.3 0.1 0.7 0.1 0.3 0.4 0.3 0.1
Andorra 80,000 89.5 0.8 8.8 0.5 0.1 0.1 0.1 0.3
Angola 19,080,000 90.5 0.2 5.1 0.1 0.1 4.2 0.1 0.1
Anguilla 20,000 90.6 0.3 4.0 0.4 0.1 2.9 1.6 0.1
Antigua and Barbuda 90,000 93.0 0.6 1.7 0.2 0.1 3.6 1.0 0.1
Argentina 40,410,000 85.2 1.0 12.2 0.1 0.1 0.8 0.3 0.5
Armenia 3,090,000 98.5 0.1 1.3 0.1 0.1 0.1 0.1 0.1
Aruba 110,000 91.9 0.2 6.0 0.1 0.1 1.3 0.1 0.4
Australia 22,270,000 67.3 2.4 24.2 1.4 2.7 0.7 0.8 0.5
Austria 8,390,000 80.4 5.4 13.5 0.1 0.2 0.1 0.1 0.2
Azerbaijan 9,190,000 3.0 96.9 0.1 0.1 0.1 0.1 0.1 0.1
Bahamas 340,000 96.0 0.1 3.1 0.1 0.1 0.3 0.3 0.1
Bahrain 1,260,000 14.5 70.3 1.9 9.8 2.5 0.1 0.2 0.6
Bangladesh 148,690,000 0.2 89.8 0.1 9.1 0.5 0.4 0.1 0.1
Barbados 270,000 95.2 1.0 1.9 0.4 0.1 0.1 1.4 0.1
Belarus 9,600,000 71.2 0.2 28.6 0.1 0.1 0.1 0.1 0.1
Belgium 10,710,000 64.2 5.9 29.0 0.1 0.2 0.2 0.1 0.3
Belize 310,000 87.6 0.1 8.9 0.2 0.5 1.5 0.1 1.0
Benin 8,850,000 53.0 23.8 5.0 0.1 0.1 18.1 0.1 0.1
Bermuda 60,000 75.0 1.1 19.4 0.1 0.5 3.0 0.8 0.3
Bhutan 730,000 0.5 0.2 0.1 22.6 74.7 1.9 0.1 0.1
Bolivia 9,930,000 93.9 0.1 4.1 0.1 0.1 0.9 1.0 0.1
Bosnia-Herzegovina 3,760,000 52.3 45.2 2.5 0.1 0.1 0.1 0.1 0.1
Botswana 2,010,000 72.1 0.4 20.6 0.3 0.1 6.0 0.6 0.1
Brazil 194,950,000 88.9 0.1 7.9 0.1 0.1 2.8 0.2 0.1
British Virgin Islands 20,000 84.5 1.2 3.9 1.2 0.1 8.4 0.8 0.1
Brunei 400,000 9.4 75.1 0.4 0.3 8.6 6.2 0.1 0.1
Bulgaria 7,490,000 82.1 13.7 4.2 0.1 0.1 0.1 0.1 0.1
Burkina Faso 16,470,000 22.5 61.6 0.4 0.1 0.1 15.4 0.1 0.1
Burma 47,960,000 7.8 4.0 0.5 1.7 80.1 5.8 0.2 0.1
Burundi 8,380,000 91.5 2.8 0.1 0.1 0.1 5.7 0.1 0.1
Cambodia 14,140,000 0.4 2.0 0.2 0.1 96.9 0.6 0.1 0.1
Cameroon 19,600,000 70.3 18.3 5.3 0.1 0.1 3.3 2.7 0.1
Canada 34,020,000 69.0 2.1 23.7 1.4 0.8 1.2 0.9 1.0
Cape Verde 500,000 89.1 0.1 9.1 0.1 0.1 1.5 0.2 0.1
Cayman Islands 60,000 83.5 0.4 9.4 0.9 0.1 4.5 0.6 0.8
Central African Republic 4,400,000 89.5 8.5 1.0 0.1 0.1 1.0 0.1 0.1
Chad 11,230,000 40.6 55.3 2.5 0.1 0.1 1.4 0.1 0.1
Channel Islands 150,000 85.2 0.1 14.2 0.1 0.1 0.1 0.3 0.1
Chile 17,110,000 89.4 0.1 8.6 0.1 0.1 1.5 0.2 0.1
China 1,341,340,000 5.1 1.8 52.2 0.1 18.2 21.9 0.7 0.1
Colombia 46,290,000 92.5 0.1 6.6 0.1 0.1 0.8 0.1 0.1
Comoros 730,000 0.5 98.3 0.1 0.1 0.1 1.0 0.1 0.1
Cook Islands 20,000 96.0 0.1 3.2 0.1 0.1 0.1 0.8 0.1
Costa Rica 4,660,000 90.9 0.1 7.9 0.1 0.1 0.8 0.3 0.1
Croatia 4,400,000 93.4 1.4 5.1 0.1 0.1 0.1 0.1 0.1
Cuba 11,260,000 59.2 0.1 23.0 0.2 0.1 17.4 0.1 0.1
Cyprus 1,100,000 73.2 25.3 1.2 0.1 0.2 0.1 0.1 0.1
Czech Republic 10,490,000 23.3 0.1 76.4 0.1 0.1 0.1 0.1 0.1
Dem. Rep. of the Congo 65,970,000 95.8 1.5 1.8 0.1 0.1 0.7 0.1 0.1
Denmark 5,550,000 83.5 4.1 11.8 0.4 0.2 0.1 0.1 0.1
Djibouti 890,000 2.3 96.9 0.2 0.1 0.1 0.3 0.1 0.2
Dominica 70,000 94.4 0.1 0.5 0.1 0.1 3.0 1.7 0.1
Dominican Republic 9,930,000 88.0 0.1 10.9 0.1 0.1 0.9 0.1 0.1
Ecuador 14,460,000 94.1 0.1 5.5 0.1 0.1 0.3 0.1 0.1
Egypt 81,120,000 5.1 94.9 0.1 0.1 0.1 0.1 0.1 0.1
El Salvador 6,190,000 88.2 0.1 11.0 0.1 0.1 0.5 0.3 0.1
Equatorial Guinea 700,000 88.7 4.0 5.0 0.1 0.1 1.7 0.5 0.1
Eritrea 5,250,000 62.9 36.6 0.1 0.1 0.1 0.4 0.1 0.1
Estonia 1,340,000 39.9 0.2 59.6 0.1 0.1 0.1 0.1 0.1
Ethiopia 82,950,000 62.8 34.6 0.1 0.1 0.1 2.6 0.1 0.1
Faeroe Islands 50,000 98.0 0.1 1.7 0.1 0.1 0.1 0.3 0.1
Falkland Is. 10,000 67.2 0.3 31.5 0.1 0.2 0.1 0.8 0.1
Fed. States of Micronesia 110,000 95.3 0.1 0.9 0.1 0.4 2.7 0.7 0.1
Fiji 860,000 64.4 6.3 0.8 27.9 0.1 0.1 0.5 0.1
Finland 5,360,000 81.6 0.8 17.6 0.1 0.1 0.1 0.1 0.1
France 62,790,000 63.0 7.5 28.0 0.1 0.5 0.3 0.2 0.5
French Guiana 230,000 84.4 0.9 3.4 1.6 0.1 9.1 0.5 0.1
French Polynesia 270,000 94.0 0.1 4.9 0.1 0.1 0.5 0.4 0.1
Gabon 1,510,000 76.5 11.2 5.6 0.1 0.1 6.0 0.7 0.1
Gambia 1,730,000 4.5 95.1 0.1 0.1 0.1 0.1 0.1 0.1
Georgia 4,350,000 88.5 10.7 0.7 0.1 0.1 0.1 0.1 0.1
Germany 82,300,000 68.7 5.8 24.7 0.1 0.3 0.1 0.1 0.3
Ghana 24,390,000 74.9 15.8 4.2 0.1 0.1 4.9 0.2 0.1
Gibraltar 30,000 88.8 4.0 2.9 1.8 0.1 0.1 0.3 2.1
Greece 11,360,000 88.1 5.3 6.1 0.1 0.1 0.1 0.1 0.1
Greenland 60,000 96.1 0.1 2.5 0.1 0.1 0.8 0.6 0.1
Grenada 100,000 96.6 0.3 1.0 0.7 0.1 1.3 0.2 0.1
Guadeloupe 460,000 95.9 0.4 2.5 0.5 0.1 0.4 0.4 0.1
Guam 180,000 94.2 0.1 1.7 0.1 1.1 1.5 1.6 0.1
Guatemala 14,390,000 95.2 0.1 4.1 0.1 0.1 0.6 0.1 0.1
Guinea 9,980,000 10.9 84.4 1.8 0.1 0.1 2.7 0.1 0.1
Guinea Bissau 1,520,000 19.7 45.1 4.3 0.1 0.1 30.9 0.1 0.1
Guyana 750,000 66.0 6.4 2.0 24.9 0.1 0.2 0.6 0.1
Haiti 9,990,000 86.9 0.1 10.6 0.1 0.1 2.2 0.3 0.1
Honduras 7,600,000 87.6 0.1 10.5 0.1 0.1 1.1 0.6 0.1
Hong Kong 7,050,000 14.3 1.8 56.1 0.4 13.2 12.8 1.5 0.1
Hungary 9,980,000 81.0 0.1 18.6 0.1 0.1 0.1 0.1 0.1
Iceland 320,000 95.0 0.2 3.5 0.3 0.4 0.5 0.2 0.1
India 1,224,610,000 2.5 14.4 0.1 79.5 0.8 0.5 2.3 0.1
Indonesia 239,870,000 9.9 87.2 0.1 1.7 0.7 0.3 0.1 0.1
Iran 73,970,000 0.2 99.5 0.1 0.1 0.1 0.1 0.2 0.1
Iraq 31,670,000 0.8 99.0 0.1 0.1 0.1 0.1 0.1 0.1
Ireland 4,470,000 92.0 1.1 6.2 0.2 0.2 0.2 0.1 0.1
Isle of Man 80,000 84.1 0.2 15.4 0.2 0.1 0.1 0.1 0.1
Israel 7,420,000 2.0 18.6 3.1 0.1 0.3 0.2 0.1 75.6
Italy 60,550,000 83.3 3.7 12.4 0.1 0.2 0.1 0.1 0.1
Ivory Coast 19,740,000 44.1 37.5 8.0 0.1 0.1 10.2 0.2 0.1
Jamaica 2,740,000 77.2 0.1 17.2 0.1 0.1 4.5 1.0 0.1
Japan 126,540,000 1.6 0.2 57.0 0.1 36.2 0.4 4.7 0.1
Jordan 6,190,000 2.2 97.2 0.1 0.1 0.4 0.1 0.1 0.1
Kazakhstan 16,030,000 24.8 70.4 4.2 0.1 0.2 0.3 0.1 0.1
Kenya 40,510,000 84.8 9.7 2.5 0.1 0.1 1.7 1.2 0.1
Kiribati 100,000 97.0 0.1 0.8 0.1 0.1 0.1 2.2 0.1
Kosovo 2,080,000 11.4 87.0 1.6 0.1 0.1 0.1 0.1 0.1
Kuwait 2,740,000 14.3 74.1 0.1 8.5 2.8 0.1 0.3 0.1
Kyrgyzstan 5,330,000 11.4 88.0 0.4 0.1 0.1 0.1 0.1 0.1
Laos 6,200,000 1.5 0.1 0.9 0.1 66.0 30.7 0.7 0.1
Latvia 2,250,000 55.8 0.1 43.8 0.1 0.1 0.1 0.2 0.1
Lebanon 4,230,000 38.3 61.3 0.3 0.1 0.2 0.1 0.1 0.1
Lesotho 2,170,000 96.8 0.1 3.1 0.1 0.1 0.1 0.1 0.1
Liberia 3,990,000 85.9 12.0 1.4 0.1 0.1 0.5 0.1 0.1
Libya 6,360,000 2.7 96.6 0.2 0.1 0.3 0.1 0.1 0.1
Liechtenstein 40,000 91.9 5.0 2.9 0.1 0.1 0.1 0.1 0.1
Lithuania 3,320,000 89.8 0.1 10.0 0.1 0.1 0.1 0.1 0.1
Luxembourg 510,000 70.4 2.3 26.8 0.1 0.1 0.1 0.3 0.1
Macau 540,000 7.2 0.2 15.4 0.1 17.3 58.9 1.0 0.1
Madagascar 20,710,000 85.3 3.0 6.9 0.1 0.1 4.5 0.1 0.1
Malawi 14,900,000 82.7 13.0 2.5 0.1 0.1 1.7 0.1 0.1
Malaysia 28,400,000 9.4 63.7 0.7 6.0 17.7 2.3 0.2 0.1
Maldives 320,000 0.4 98.4 0.1 0.3 0.6 0.1 0.1 0.1
Mali 15,370,000 3.2 92.4 2.7 0.1 0.1 1.6 0.1 0.1
Malta 420,000 97.0 0.2 2.5 0.2 0.1 0.1 0.1 0.1
Marshall Islands 50,000 97.5 0.1 1.5 0.1 0.1 0.3 0.8 0.1
Martinique 410,000 96.5 0.2 2.3 0.2 0.1 0.2 0.6 0.1
Mauritania 3,460,000 0.3 99.1 0.1 0.1 0.1 0.5 0.1 0.1
Mauritius 1,300,000 25.3 16.7 0.6 56.4 0.1 0.7 0.3 0.1
Mayotte 200,000 0.7 98.6 0.2 0.1 0.1 0.5 0.1 0.1
Mexico 113,420,000 95.1 0.1 4.7 0.1 0.1 0.1 0.1 0.1
Moldova 3,570,000 97.4 0.6 1.4 0.1 0.1 0.1 0.1 0.6
Monaco 40,000 86.0 0.4 11.7 0.1 0.1 0.1 0.2 1.7
Mongolia 2,760,000 2.3 3.2 35.9 0.1 55.1 3.5 0.1 0.1
Montenegro 630,000 78.1 18.7 3.2 0.1 0.1 0.1 0.1 0.1
Montserrat 10,000 93.5 0.1 4.8 0.1 0.1 0.2 1.5 0.1
Morocco 31,950,000 0.1 99.9 0.1 0.1 0.1 0.1 0.1 0.1
Mozambique 23,390,000 56.7 18.0 17.9 0.1 0.1 7.4 0.1 0.1
Namibia 2,280,000 97.5 0.3 1.9 0.1 0.1 0.2 0.1 0.1
Nauru 10,000 79.0 0.1 4.5 0.1 1.1 8.1 7.4 0.1
Nepal 29,960,000 0.5 4.6 0.3 80.7 10.3 3.7 0.1 0.1
Netherlands 16,610,000 50.6 6.0 42.1 0.5 0.2 0.2 0.2 0.2
Netherlands Antilles 200,000 93.9 0.2 3.3 0.2 0.5 1.2 0.3 0.3
New Caledonia 250,000 85.2 2.8 10.4 0.1 0.6 0.2 0.8 0.1
New Zealand 4,370,000 57.0 1.2 36.6 2.1 1.6 0.5 0.7 0.2
Nicaragua 5,790,000 85.8 0.1 12.5 0.1 0.1 1.4 0.1 0.1
Niger 15,510,000 0.8 98.4 0.7 0.1 0.1 0.1 0.1 0.1
Nigeria 158,420,000 49.3 48.8 0.4 0.1 0.1 1.4 0.1 0.1
Niue 10,000 96.4 0.1 3.3 0.1 0.1 0.1 0.2 0.1
North Korea 24,350,000 2.0 0.1 71.3 0.1 1.5 12.3 12.9 0.1
Northern Mariana Is. 60,000 81.3 0.7 1.0 0.1 10.6 5.3 1.1 0.1
Norway 4,880,000 84.7 3.7 10.1 0.5 0.6 0.1 0.2 0.1
Oman 2,780,000 6.5 85.9 0.2 5.5 0.8 0.1 1.0 0.1
Pakistan 173,590,000 1.6 96.4 0.1 1.9 0.1 0.1 0.1 0.1
Palau 20,000 86.7 0.1 1.2 0.1 0.8 0.8 10.4 0.1
Palestinian territories 4,040,000 2.4 97.6 0.1 0.1 0.1 0.1 0.1 0.1
Panama 3,520,000 93.0 0.7 4.8 0.1 0.2 0.4 0.4 0.4
Papua New Guinea 6,860,000 99.2 0.1 0.1 0.1 0.1 0.4 0.2 0.1
Paraguay 6,450,000 96.9 0.1 1.1 0.1 0.1 1.7 0.2 0.1
Peru 29,080,000 95.5 0.1 3.0 0.1 0.2 1.0 0.3 0.1
Philippines 93,260,000 92.6 5.5 0.1 0.1 0.1 1.5 0.1 0.1
Poland 38,280,000 94.3 0.1 5.6 0.1 0.1 0.1 0.1 0.1
Portugal 10,680,000 93.8 0.6 4.4 0.1 0.6 0.5 0.1 0.1
Puerto Rico 3,750,000 96.7 0.1 1.9 0.1 0.3 0.8 0.1 0.1
Qatar 1,760,000 13.8 67.7 0.9 13.8 3.1 0.1 0.7 0.1
Republic of Macedonia 2,060,000 59.3 39.3 1.4 0.1 0.1 0.1 0.1 0.1
Republic of the Congo 4,040,000 85.9 1.2 9.0 0.1 0.1 2.8 1.1 0.1
Reunion 850,000 87.6 4.2 2.0 4.5 0.2 0.4 1.1 0.1
Romania 21,490,000 99.5 0.3 0.1 0.1 0.1 0.1 0.1 0.1
Russia 142,960,000 73.3 10.0 16.2 0.1 0.1 0.2 0.1 0.2
Rwanda 10,620,000 93.4 1.8 3.6 0.1 0.1 1.0 0.2 0.1
Samoa 180,000 96.8 0.1 2.5 0.1 0.1 0.1 0.4 0.1
San Marino 30,000 91.6 0.1 7.2 0.1 0.1 0.1 0.9 0.3
Sao Tome and Principe 170,000 82.2 0.1 12.6 0.1 0.1 2.9 2.4 0.1
Saudi Arabia 27,450,000 4.4 93.0 0.7 1.1 0.3 0.3 0.3 0.1
Senegal 12,430,000 3.6 96.4 0.1 0.1 0.1 0.1 0.1 0.1
Serbia 7,770,000 92.5 4.2 3.3 0.1 0.1 0.1 0.1 0.1
Seychelles 90,000 94.0 1.1 2.1 2.1 0.1 0.1 0.6 0.1
Sierra Leone 5,870,000 20.9 78.0 0.1 0.1 0.1 0.8 0.1 0.1
Singapore 5,090,000 18.2 14.3 16.4 5.2 33.9 2.3 9.7 0.1
Slovakia 5,460,000 85.3 0.2 14.3 0.1 0.1 0.1 0.1 0.1
Slovenia 2,030,000 78.4 3.6 18.0 0.1 0.1 0.1 0.1 0.1
Solomon Islands 540,000 97.4 0.1 0.2 0.1 0.3 1.3 0.7 0.1
Somalia 9,330,000 0.1 99.8 0.1 0.1 0.1 0.1 0.1 0.1
South Africa 50,130,000 81.2 1.7 14.9 1.1 0.2 0.4 0.3 0.1
South Korea 48,180,000 29.4 0.2 46.4 0.1 22.9 0.8 0.2 0.1
South Sudan 9,950,000 60.5 6.2 0.5 0.1 0.1 32.9 0.1 0.1
Spain 46,080,000 78.6 2.1 19.0 0.1 0.1 0.1 0.1 0.1
Sri Lanka 20,860,000 7.3 9.8 0.1 13.6 69.3 0.1 0.1 0.1
St. Helena 10,000 96.5 0.1 3.3 0.1 0.1 0.1 0.2 0.1
St. Kitts and Nevis 50,000 94.6 0.3 1.6 1.5 0.1 1.3 0.8 0.1
St. Lucia 170,000 91.1 0.1 6.0 0.3 0.1 0.5 2.0 0.1
St. Pierre and Miquelon 10,000 94.7 0.2 3.8 0.1 0.1 0.1 1.3 0.1
St. Vincent and the Gren. 110,000 88.7 1.5 2.5 3.4 0.1 2.0 2.0 0.1
Sudan 33,600,000 5.4 90.7 1.0 0.1 0.1 2.8 0.1 0.1
Suriname 520,000 51.6 15.2 5.4 19.8 0.6 5.3 1.8 0.2
Swaziland 1,190,000 88.1 0.2 10.1 0.1 0.1 1.0 0.4 0.1
Sweden 9,380,000 67.2 4.6 27.0 0.2 0.4 0.2 0.2 0.1
Switzerland 7,660,000 81.3 5.5 11.9 0.4 0.4 0.1 0.1 0.3
Syria 20,410,000 5.2 92.8 2.0 0.1 0.1 0.1 0.1 0.1
Taiwan 23,220,000 5.5 0.1 12.7 0.1 21.3 44.2 16.2 0.1
Tajikistan 6,880,000 1.6 96.7 1.5 0.1 0.1 0.1 0.1 0.1
Tanzania 44,840,000 61.4 35.2 1.4 0.1 0.1 1.8 0.1 0.1
Thailand 69,120,000 0.9 5.5 0.3 0.1 93.2 0.1 0.1 0.1
Timor-Leste 1,120,000 99.6 0.1 0.1 0.1 0.1 0.1 0.1 0.1
Togo 6,030,000 43.7 14.0 6.2 0.1 0.1 35.6 0.6 0.1
Tokelau 10,000 99.8 0.1 0.1 0.1 0.1 0.1 0.2 0.1
Tonga 100,000 98.9 0.1 0.1 0.1 0.1 0.1 0.9 0.1
Trinidad and Tobago 1,340,000 65.9 5.9 1.9 22.7 0.3 1.9 1.4 0.1
Tunisia 10,480,000 0.2 99.5 0.2 0.1 0.1 0.1 0.1 0.1
Turkey 72,750,000 0.4 98.0 1.2 0.1 0.1 0.1 0.2 0.1
Turkmenistan 5,040,000 6.4 93.0 0.5 0.1 0.1 0.1 0.1 0.1
Turks and Caicos Islands 40,000 92.1 0.1 4.6 0.1 0.1 2.7 0.6 0.1
Tuvalu 10,000 96.7 0.1 1.3 0.1 0.1 0.1 1.9 0.1
U.S. Virgin Islands 110,000 94.8 0.1 3.7 0.4 0.1 0.1 0.6 0.3
Uganda 33,420,000 86.7 11.5 0.5 0.3 0.1 0.9 0.1 0.1
Ukraine 45,450,000 83.8 1.2 14.7 0.1 0.1 0.1 0.1 0.1
United Arab Emirates 7,510,000 12.6 76.9 1.1 6.6 2.0 0.1 0.8 0.1
United Kingdom 62,040,000 71.1 4.4 21.3 1.3 0.4 0.3 0.8 0.5
United States 310,380,000 78.3 0.9 16.4 0.6 1.2 0.2 0.6 1.8
Uruguay 3,370,000 57.9 0.1 40.7 0.1 0.1 0.8 0.3 0.3
Uzbekistan 27,440,000 2.3 96.7 0.8 0.1 0.1 0.1 0.1 0.1
Vanuatu 240,000 93.3 0.1 1.2 0.1 0.1 4.1 1.4 0.1
Vatican City 10,000 >99.0 0.1 0.1 0.1 0.1 0.1 0.1 0.1
Venezuela 28,980,000 89.3 0.3 10.0 0.1 0.1 0.2 0.1 0.1
Vietnam 87,850,000 8.2 0.2 29.6 0.1 16.4 45.3 0.4 0.1
Wallis and Futuna 10,000 97.4 0.1 0.6 0.1 0.1 1.2 0.8 0.1
Western Sahara 530,000 0.2 99.4 0.4 0.1 0.1 0.1 0.1 0.1
Yemen 24,050,000 0.2 99.1 0.1 0.6 0.1 0.1 0.1 0.1
Zambia 13,090,000 97.6 0.5 0.5 0.1 0.1 0.3 0.9 0.1
Zimbabwe 12,570,000 87.0 0.9 7.9 0.1 0.1 3.8 0.3 0.1`

let data = stringTo2DList(inputString);

const randomIndex = Math.floor(Math.random() * data.length);
let scores = scoresList(randomIndex);

let guesses = [];

// startGame();
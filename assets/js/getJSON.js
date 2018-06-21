// An ajax request fuction to get the interval excryptions from the github page;

const JSONRequest = new XMLHttpRequest();

const getJSON = (type) => { // type = 'binary', 'ternary', etc.
    return new Promise(resolve => {
        let path = `https://raw.githubusercontent.com/QED0711/ChordProcessor/master/json/${type}-simplified.json`
        JSONRequest.open("GET", path, true);
        
        JSONRequest.onload = () => {
            resolve(JSON.parse(JSONRequest.responseText))
            // setSchemes(JSON.parse(JSONRequest.responseText))
        }
        JSONRequest.send();
    })
}


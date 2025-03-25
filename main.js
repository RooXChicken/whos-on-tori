const toriAPI = "https://jp-mktt.loveroo.org:25533/api/tori_users";
const mcHeads = "https://mc-heads.net/avatar/";

const onlinePlayersLabel = document.getElementById("onlinePlayersLabel");
const avatars = document.getElementById("heads");

const textColors = ["128, 128, 128", "120, 120, 120", "24, 24, 24", "0, 0, 0", "10, 10, 10"];

var playerCount = 0;
var players = [];

function onLoad() {
    let _bg = Math.floor(Math.random()*5)+1;
    document.body.style.backgroundImage = `url(assets/bg${_bg}.jpg)`;
    document.body.style.setProperty("--label-bg-color", `rgba(${textColors[_bg-1]}, 0.35)`);

    getPlayers();
    setInterval(getPlayers, 12000);
}

function getPlayers() {
    fetch(toriAPI, { }).then((_response) => {
        _response.json().then((_body) => {
            playerCount = _body["count"];
            onlinePlayersLabel.innerText = `Online players: ${playerCount}`;

            let _uuids = _body["uuid"];
            for(let _uuid in players) {
                if(_uuids[_uuid] === undefined) {
                    avatars.removeChild(document.getElementById(_uuid));
                }
            }
            
            for(let _uuid in _uuids) {
                if(players[_uuid] === undefined) {
                    createHead(_uuid, _uuids[_uuid]);
                }
            }

            players = _uuids;
        })
    });
}

function createHead(_uuid, _name) {
    let _div = document.createElement("div");
    _div.id = _uuid;
    _div.classList.add("playerHead");

    let _label = document.createElement("p");
    _label.classList.add("playerNameLabel");
    _label.classList.add("label");

    _label.innerText = _name;

    let _link = document.createElement("a");
    _link.href = `https://namemc.com/profile/${_name}`;

    let _head = document.createElement("img");
    _head.classList.add("playerAvatar");

    _head.onmouseenter = (_event) => {
        _label.style.display = "block";
    };

    _head.onmouseleave = (_event) => {
        _label.style.display = "none";
    };

    _link.appendChild(_head);

    let _url = `${mcHeads + _uuid}.png`;
    _head.src = _url;

    _div.appendChild(_label);
    _div.appendChild(_link);
    avatars.appendChild(_div);
}
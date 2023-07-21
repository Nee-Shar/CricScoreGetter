console.log("HELLO");

async function getData() {
  return await fetch(
    "https://api.cricapi.com/v1/cricScore?apikey=b8a99242-3cac-4378-b8d8-e3441178705f"
  ).then((data) => data.json());
}

function displayMatches() {
  const fetchButton = document.getElementById("fetchButton");
  fetchButton.disabled = true; // Disable the button during API request

  getData().then((response) => {
    const matches = response.data;
    let indiaMatches = false;

    matches.forEach((match) => {
      if (match.t1 === "India [IND]" || match.t2 === "India [IND]") {
        document.getElementById("Status").innerText =
          "Status of match => " + match.status;
        document.getElementById("date").innerText =
          "Match date =>  " + match.dateTimeGMT.split("T")[0];
        document.getElementById("type").innerText =
          "Type of Match =>  " + match.matchType;
        document.getElementById("Team1").innerText = "Team => " + match.t1;
        document.getElementById("Team2").innerText = "Team =>  " + match.t2;
        document.getElementById("score1").innerText =
          "Score " + match.t1 + "=> " + match.t1s;
        document.getElementById("score2").innerText =
          "Score " + match.t2 + "=> " + match.t2s;
      }
      indiaMatches = true;
    });

    if (!indiaMatches) {
      document.getElementById("Status").innerText =
        "Sorry, India doesn't play today.";
    }

    fetchButton.disabled = false; // Re-enable the button
  });
}

const fetchButton = document.getElementById("fetchButton");
fetchButton.addEventListener("click", displayMatches);

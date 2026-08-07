document.addEventListener("DOMContentLoaded", () => {

    fetch("data/assignments.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Assignments loaded successfully!");
        })
        .catch(error => {
            console.error(error);
            alert("Couldn't load assignments.json");
        });

});
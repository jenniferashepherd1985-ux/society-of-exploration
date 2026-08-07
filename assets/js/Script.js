let assignments = [];
document.addEventListener("DOMContentLoaded", () => {

    fetch("data/assignments.json")
    .then(response => response.json())
    .then(data => {
        assignments = data.assignments;
        console.log(assignments);
    })
    .catch(error => {
        console.error(error);
    });

});
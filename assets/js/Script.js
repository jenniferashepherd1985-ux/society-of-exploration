async function loadAssignment(filename) {

    const response = await fetch(`data/${filename}`);

    return await response.json();

}

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
    const form = document.getElementById("archive-form");
    const status = document.getElementById("archive-status");
    
    form.addEventListener("submit", function (event) {
    
        event.preventDefault();
    
        const reference = document
            .getElementById("archiveRef")
            .value
            .trim()
            .toUpperCase();
    
        const assignment = assignments.find(
            a => a.reference === reference
        );
    
        if (assignment) {
    
            loadAssignment(assignment.assignment)
    .then(data => {

                status.innerHTML = `
                    <h2>${data.title}</h2>
        
                    <p><strong>Status:</strong> ${data.status}</p>
        
                    <p>${data.brief}</p>
        
                    <p><strong>Clearance:</strong> ${data.clearance}</p>
        
                    <p>${data.next}</p>
                `;
        
            });
    
        } else {
    
            status.innerHTML = `
                <h2>Archive Reference Not Recognised</h2>
    
                <p>
                Please verify the Archive Reference printed on your Society Dossier.
                </p>
            `;
    
        }
    
    });
});
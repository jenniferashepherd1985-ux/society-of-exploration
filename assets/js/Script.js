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
    
            document.getElementById("archive-form-container").style.display = "none";
            
            loadAssignment(assignment.assignment)
    .then(data => {

                status.innerHTML = `
                <h2>${data.title}</h2>
            
                <p><strong>Archive Reference</strong><br>${data.reference}</p>
            
                <p><strong>Classification</strong><br>${data.classification}</p>
            
                <p><strong>Security Clearance</strong><br>${data.clearance}</p>
            
                <p><strong>Status</strong><br>${data.status}</p>
            
                <hr>
            
                <h3>${data.briefingTitle}</h3>
            
                <p>${data.briefing.replace(/\n/g, "<br><br>")}</p>
            
                <hr>
            
                <h3>Required Equipment</h3>
            
                <ul>
                    ${data.equipment.map(item => `<li>${item}</li>`).join("")}
                </ul>
            
                <hr>
            
                <p><em>${data.authorisation}</em></p>
            
                <button class="archive-button" id="beginMission">
                    Begin Field Assignment
                </button>
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
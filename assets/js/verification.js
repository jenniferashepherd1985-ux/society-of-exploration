let assignments = [];

document.addEventListener("DOMContentLoaded", () => {

    fetch("data/assignments.json")
        .then(response => response.json())
        .then(data => {
            assignments = data.assignments;
            console.log("Verification assignments loaded:", assignments);
        })
        .catch(error => {
            console.error("Unable to load assignments:", error);
        });

    const form = document.getElementById("verification-form");
    const status = document.getElementById("verification-status");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const reference = document
            .getElementById("archiveReference")
            .value
            .trim()
            .toUpperCase();

        const password = document
            .getElementById("verificationPassword")
            .value
            .trim()
            .toUpperCase();

        const assignment = assignments.find(
            a => a.reference === reference
        );

        if (!assignment) {

            status.innerHTML = `
                <h2>Archive Reference Not Recognised</h2>

                <p>
                The Society cannot authenticate this Archive Reference.
                </p>

                <p>
                Please verify the reference printed on your Society Mission Card.
                </p>
            `;

            return;
        }

        if (password === assignment.password.toUpperCase()) {

            status.innerHTML = `
                <h2>Discovery Authenticated</h2>

                <p>
                The Society confirms your discovery.
                </p>

                <p>
                Your investigation has been successfully verified.
                </p>

                <p>
                <strong>Artefact Authorisation Granted</strong>
                </p>

                <p>
                Discovery awaits.
                </p>
            `;

        } else {

            status.innerHTML = `
                <h2>Verification Unsuccessful</h2>

                <p>
                The Society cannot authenticate this discovery.
                </p>

                <p>
                Re-examine the evidence and try again.
                </p>
            `;

        }

    });

});
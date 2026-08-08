let assignments = [];

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

}

document.addEventListener("DOMContentLoaded", () => {

    fetch("data/assignments.json")
        .then(response => response.json())
        .then(data => {

            assignments = data.assignments;

            console.log(
                "Verification assignments loaded:",
                assignments
            );

        })
        .catch(error => {

            console.error(
                "Unable to load assignments:",
                error
            );

        });

    const form = document.getElementById("verification-form");

    const status = document.getElementById("verification-status");

    form.addEventListener("submit", async function (event) {

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

        if (!assignment.passwordHash) {

            status.innerHTML = `
                <h2>Archive Sealed</h2>

                <p>
                This field assignment has not yet been released
                for verification.
                </p>
            `;

            return;

        }

        const enteredHash = await hashPassword(password);

        if (enteredHash === assignment.passwordHash) {

            status.innerHTML = `
                <h2>Discovery Authenticated</h2>

                <p>
                The Society confirms your discovery.
                </p>

                <p>
                Your field investigation has been successfully verified.
                </p>

                <p>
                <strong>Mission authorised.</strong>
                </p>
            `;

        } else {

            status.innerHTML = `
                <h2>Discovery Not Authenticated</h2>

                <p>
                The Society cannot verify this solution.
                </p>

                <p>
                Re-examine the evidence and try again.
                </p>
            `;

        }

    });

});
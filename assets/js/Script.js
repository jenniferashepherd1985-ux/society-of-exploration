/*
====================================================
 Society of Exploration
 Website v1.0.0
 script.js
====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    // Smooth page fade-in
    document.body.style.opacity = "0";

    requestAnimationFrame(() => {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "1";
    });

    // Archive form
    const form = document.getElementById("archive-form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const input = document.getElementById("archiveRef");
            const status = document.getElementById("archive-status");

            const value = input.value.trim();

            if (value === "") {

                status.innerHTML = `
                    <h2>Archive Status</h2>
                    <p>Please enter the Archive Reference printed on your Society Dossier.</p>
                `;

                return;
            }
alert("Button clicked");
            status.innerHTML = `
                <h2>Consulting the Society...</h2>

                <p>Your archive reference has been received.</p>

                <p><strong>Reference:</strong> ${value}</p>

                <p>
                    Society verification remains sealed until
                    the official expedition content is installed.
                </p>

                <p><em>Discovery Awaits.</em></p>
            `;

            status.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }

});

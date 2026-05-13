/* ============================================================
   CONTACT.JS — Validation et envoi du formulaire de contact
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const divParent = document.getElementById("chargementContainer");

    const chargement = () => {
        if (divParent) {
            divParent.innerHTML = `<div class="chargement"><div class="spinner"></div></div>`;
        }
    };

    const submitForm = () => {
        const champsRequis = [
            document.getElementById("nomRef"),
            document.getElementById("emailRef"),
            document.getElementById("objetRef"),
            document.getElementById("messageRef")
        ];
        let erreurDetecte = false;
        champsRequis.forEach(champ => {
            if (!champ) return;
            if (champ.value.trim() === "") {
                champ.classList.add("inputContainerError");
                erreurDetecte = true;
            } else {
                champ.classList.remove("inputContainerError");
            }
        });
        if (erreurDetecte) {
            setTimeout(() => {
                document.querySelectorAll(".inputContainerError").forEach(i => i.classList.remove("inputContainerError"));
            }, 1000);
            return;
        }
        chargement();
        form.submit();
    };

    if (form) {
        form.addEventListener("keydown", event => {
            if (event.key === "Enter") { event.preventDefault(); submitForm(); }
        });
    }
    window.submitForm = submitForm;
});

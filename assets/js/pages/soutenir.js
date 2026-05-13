/* ============================================================
   SOUTENIR.JS — Validation et envoi du formulaire de soutien
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const button = document.getElementById("buttonSubmit");

    const chargement = () => {
        if (button) {
            button.disabled = true;
            button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Envoi en cours...`;
        }
    };

    const submitForm = () => {
        const requiredFields = [
            document.getElementById("nomRef"),
            document.getElementById("emailRef"),
            document.getElementById("entrepriseRef"),
            document.getElementById("messageRef")
        ];
        let errorDetected = false;
        requiredFields.forEach(field => {
            if (!field) return;
            if (field.value.trim() === "") {
                field.classList.add("inputContainerError");
                errorDetected = true;
            } else {
                field.classList.remove("inputContainerError");
            }
        });
        if (errorDetected) {
            setTimeout(() => {
                requiredFields.forEach(f => { if (f) f.classList.remove("inputContainerError"); });
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

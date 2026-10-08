const form = document.querySelector("#contact-form");

if (form) {
    const fields = [...form.querySelectorAll("input, textarea")];
    const status = form.querySelector("#form-status");

    const getError = (field) => {
        const value = field.value.trim();

        if (!value) return "Ce champ est obligatoire.";

        if (field.name === "nom" || field.name === "prenom") {
            if (value.length < 2) return "Saisissez au moins 2 caractères.";
            if (!/^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u.test(value)) {
                return "Utilisez uniquement des lettres, espaces, apostrophes ou traits d’union.";
            }
        }

        if (field.name === "email") {
            if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
                return "Saisissez une adresse e-mail valide.";
            }
        }

        if (field.name === "objet") {
            if (value.length < 3) return "L’objet doit contenir au moins 3 caractères.";
            if (!/^[\p{L}\p{N}][\p{L}\p{N} ,.'’!?()&:/_+-]*$/u.test(value)) {
                return "L’objet contient un caractère non autorisé.";
            }
        }

        if (field.name === "message") {
            if (value.length < 10) return "Le message doit contenir au moins 10 caractères.";
            if (value.length > 2000) return "Le message ne peut pas dépasser 2 000 caractères.";
            if (!/[\p{L}\p{N}]/u.test(value)) return "Ajoutez du texte à votre message.";
        }

        return "";
    };

    const validateField = (field) => {
        const error = getError(field);
        const errorElement = form.querySelector(`#${field.id}-error`);

        field.setAttribute("aria-invalid", String(Boolean(error)));
        if (errorElement) errorElement.textContent = error;
        return !error;
    };

    fields.forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
            if (field.hasAttribute("aria-invalid")) validateField(field);
            status.textContent = "";
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const valid = fields.map(validateField).every(Boolean);

        if (!valid) {
            status.textContent = "Veuillez corriger les champs indiqués.";
            form.querySelector('[aria-invalid="true"]')?.focus();
            return;
        }

        status.textContent = "Vos informations sont valides. L’envoi du formulaire sera disponible une fois le site relié à une adresse de réception.";
    });
}

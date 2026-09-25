// ===============================
// SITEPRO ACADEMY - JAVASCRIPT
// ===============================

let concluidas = JSON.parse(localStorage.getItem("aulasConcluidas") || "[]");

// Abrir / fechar módulo
function toggleModule(header) {
    const module = header.closest(".module");

    if (module) {
        module.classList.toggle("open");
    }
}

// Concluir aula
function completeLesson(button, nomeAula) {

    if (!concluidas.includes(nomeAula)) {
        concluidas.push(nomeAula);

        localStorage.setItem(
            "aulasConcluidas",
            JSON.stringify(concluidas)
        );

        button.classList.add("done");
        button.textContent = "✓ Concluída";

        atualizarProgresso();

        mostrarMensagem("Aula concluída! 🎉");
    } else {
        mostrarMensagem("Essa aula já foi concluída.");
    }
}

// Atualizar progresso
function atualizarProgresso() {

    const total = 18;
    const quantidade = concluidas.length;

    const porcentagem = Math.round(
        (quantidade / total) * 100
    );

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");

    const completedText =
        document.getElementById("completedText");

    if (progressText) {
        progressText.textContent = porcentagem + "%";
    }

    if (progressFill) {
        progressFill.style.width = porcentagem + "%";
    }

    if (completedText) {
        completedText.textContent = quantidade;
    }
}

// Mensagem
function mostrarMensagem(texto) {

    let toast = document.querySelector(".toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

// Materiais
function materialMessage() {
    mostrarMensagem("Os materiais estarão disponíveis em breve! 📚");
}

// Certificado
function certificateMessage() {

    if (concluidas.length < 18) {
        mostrarMensagem(
            "Conclua todas as 18 aulas para liberar o certificado! 🏆"
        );
        return;
    }

    mostrarMensagem(
        "Parabéns! Seu certificado está liberado! 🏆🎉"
    );
}

// Restaurar progresso ao abrir a página
function restaurarProgresso() {

    document
        .querySelectorAll(".complete-btn")
        .forEach(function (button) {

            const codigo = button.getAttribute("onclick");

            if (!codigo) return;

            const resultado =
                codigo.match(/completeLesson\(this,'(.*?)'\)/);

            if (!resultado) return;

            const nomeAula = resultado[1];

            if (concluidas.includes(nomeAula)) {
                button.classList.add("done");
                button.textContent = "✓ Concluída";
            }
        });

    atualizarProgresso();
}

// Iniciar
document.addEventListener("DOMContentLoaded", function () {
    restaurarProgresso();
});

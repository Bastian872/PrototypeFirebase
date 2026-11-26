import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey:
    "AIzaSyAnqJ7rT7a4SaW4f_48faLgxjIMhKO4kCI",

    authDomain:
    "calendrier-avent-couple-52fba.firebaseapp.com",

    projectId:
    "calendrier-avent-couple-52fba",

    storageBucket:
    "calendrier-avent-couple-52fba.firebasestorage.app",

    messagingSenderId:
    "101261649418",

    appId:
    "1:101261649418:web:7c06721ae0a556fc7de1f3"
};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

async function loadQuestion(){

    const docRef =
    doc(
        db,
        "reponses",
        "jour_1"
    );

    const docSnap =
    await getDoc(docRef);

    if(docSnap.exists()){

    const data =
        docSnap.data();

    document.getElementById(
        "question"
    ).innerText =
    data.question;

    let statusText =
    data.status;

if(
    data.reponse_kelly &&
    data.reponse_philippe
){

    statusText =
    "💌 Réponses disponibles";
document
.getElementById(
    "notification"
)
.style.display =
"block";

document
.getElementById(
    "notification"
)
.innerText =
statusText;

    document
    .getElementById(
        "showAnswers"
    )
    .style.display =
    "block";
}
else{

    statusText =
    "✅ Votre réponse est enregistrée\n\n⏳ En attente de Philippe...";

    document
    .getElementById(
        "showAnswers"
    )
    .style.display =
    "none";
}


document.getElementById(
    "status"
).innerText =
statusText;
document
.getElementById(
    "notification"
)
.style.display =
"block";
}
}

loadQuestion();

window.saveAnswer =
async function(){

    const answer =
    document.getElementById(
        "answer"
    ).value;

    const docRef =
    doc(
        db,
        "reponses",
        "jour_1"
    );

    await updateDoc(
        docRef,
        {
            reponse_kelly:
            answer
        }
    );

    alert(
        "Réponse enregistrée ❤️"
    );
}
document
.getElementById(
    "showAnswers"
)
.addEventListener(
    "click",
    async () => {

        const docRef =
        doc(
            db,
            "reponses",
            "jour_1"
        );

        const docSnap =
        await getDoc(
            docRef
        );

        const data =
        docSnap.data();

        document
        .getElementById(
            "answers"
        )
        .style.display =
        "block";

        document
.getElementById(
    "notification"
)
.innerText =
statusText;

        document
        .getElementById(
            "answers"
        )
        .innerHTML =

        `
        <h3>
        ❤️ Kelly
        </h3>

        <p>
        ${data.reponse_kelly}
        </p>

        <h3>
        ❤️ Philippe
        </h3>

        <p>
        ${data.reponse_philippe}
        </p>
        `;
    }
);

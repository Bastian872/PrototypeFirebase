import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
    getMessaging,
    getToken
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging.js";


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
const messaging =
getMessaging(app);
function getCurrentDay(){

    const now =
    new Date();

    const day =
    now.getDate();

    return `jour_${day}`;
}


function loadQuestion(){

    console.log("Chargement :", getCurrentDay());

    const docRef = doc(
        db,
        "reponses",
        getCurrentDay()
    );

    onSnapshot(
        docRef,
        (docSnap) => {

            console.log("Document trouvé ?", docSnap.exists());

            if(!docSnap.exists()){
                document.getElementById("question").innerText =
                    "Aucune question trouvée dans Firebase";

                document.getElementById("status").style.display = "none";


                return;
            }

            console.log(docSnap.data());

            const data = docSnap.data();

        

            document
            .getElementById(
                "question"
            )
            .innerText =
            data.question;

            const user = localStorage.getItem("user");

let statusText = "";

if(user === "kelly"){

    if(data.reponse_kelly){
        statusText =
        "✅ Votre réponse est enregistrée\n\n⏳ En attente de Philippe...";
    }else{
        statusText =
        "✍️ Répondez à la question du jour";
    }

}else{

    if(data.reponse_philippe){
        statusText =
        "✅ Votre réponse est enregistrée\n\n⏳ En attente de Kelly...";
    }else{
        statusText =
        "✍️ Répondez à la question du jour";
    }

}

            if(
                data.reponse_kelly &&
                data.reponse_philippe
            ){

                statusText =
                "💌 Réponses disponibles";

                document
                .getElementById(
                    "showAnswers"
                )
                .style.display =
                "block";
            }
            else{

                document
                .getElementById(
                    "showAnswers"
                )
                .style.display =
                "none";
            }

            document
            .getElementById(
                "status"
            )
            .innerText =
            statusText;

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
        }
    );
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
    getCurrentDay()
);

    const user =
    localStorage.getItem(
        "user"
    );

    if(user === "kelly"){

        await updateDoc(
            docRef,
            {
                reponse_kelly:
                answer
            }
        );
    }
    else{

        await updateDoc(
            docRef,
            {
                reponse_philippe:
                answer
            }
        );
    }

    alert(
        "Réponse enregistrée ❤️"
    );
};

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
    getCurrentDay()
);

        const docSnap =
        await getDoc(docRef);

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
            "answers"
        )
        .innerHTML =
        `
        <h3>Kelly</h3>

        <p>${data.reponse_kelly}</p>

        <h3>Philippe</h3>

        <p>${data.reponse_philippe}</p>
        `;
    }
);

function chooseUser(user){

    localStorage.setItem(
        "user",
        user
    );

    document
    .getElementById(
        "identityScreen"
    )
    .style.display =
    "none";

    document
    .getElementById(
        "app"
    )
    .style.display =
    "block";
}

window.chooseUser =
chooseUser;

if(
    localStorage.getItem(
        "user"
    )
){

    document
    .getElementById(
        "identityScreen"
    )
    .style.display =
    "none";

    document
    .getElementById(
        "app"
    )
    .style.display =
    "block";
}

window.askNotificationPermission =
async function(){

    const permission =
    await Notification.requestPermission();

    console.log(
        "Permission :",
        permission
    );

    if(
        permission ===
        "granted"
    ){

        try{

            const currentToken =
            await getToken(
                messaging,
                {
                    vapidKey:
                    "BBL4-5eOiC-aIEl3gs5hboorRaoIR661CKYYHldR0ahzk4LkwV6h4nKxoJMtNtn-Ipzlxyp6IbNu1zJVkTecPeA"
                }
            );

            console.log(
                "Token Firebase :",
                currentToken
            );

        }
        catch(error){

            console.error(
                error
            );
        }
    }
}


const usernameInput = document.getElementById("username");
const roomCodeInput = document.getElementById("roomCode");

const createRoomButton = document.getElementById("createRoom");
const joinRoomButton = document.getElementById("joinRoom");

const message = document.getElementById("message");


function showMessage(text) {
    message.textContent = text;
}


function createRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        code += characters[randomIndex];
    }

    return code;
}


function getUsername() {

    const username =
        usernameInput.value.trim();

    if (!username) {

        showMessage(
            "لطفاً ابتدا نام خودت را وارد کن."
        );

        usernameInput.focus();

        return null;
    }

    if (username.length < 2) {

        showMessage(
            "نام باید حداقل ۲ حرف داشته باشد."
        );

        usernameInput.focus();

        return null;
    }

    return username;
}


createRoomButton.addEventListener(
    "click",
    () => {

        const username = getUsername();

        if (!username) {
            return;
        }

        const roomCode =
            createRoomCode();

        const url =
            new URL(
                window.location.href
            );

        url.searchParams.set(
            "room",
            roomCode
        );

        window.location.href =
            url.toString();
    }
);


joinRoomButton.addEventListener(
    "click",
    () => {

        const username = getUsername();

        if (!username) {
            return;
        }

        const roomCode =
            roomCodeInput.value
                .trim()
                .toUpperCase();

        if (!roomCode) {

            showMessage(
                "لطفاً کد اتاق را وارد کن."
            );

            roomCodeInput.focus();

            return;
        }

        if (roomCode.length < 4) {

            showMessage(
                "کد اتاق معتبر نیست."
            );

            roomCodeInput.focus();

            return;
        }

        const url =
            new URL(
                window.location.href
            );

        url.searchParams.set(
            "room",
            roomCode
        );

        window.location.href =
            url.toString();
    }
);


roomCodeInput.addEventListener(
    "input",
    () => {

        roomCodeInput.value =
            roomCodeInput.value
                .toUpperCase()
                .replace(
                    /[^A-Z0-9]/g,
                    ""
                )
                .slice(0, 12);
    }
);


const currentRoom =
    new URLSearchParams(
        window.location.search
    ).get("room");


if (currentRoom) {

    roomCodeInput.value =
        currentRoom.toUpperCase();

    showMessage(
        `کد اتاق: ${currentRoom.toUpperCase()}`
    );
}

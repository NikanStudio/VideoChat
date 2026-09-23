const usernameInput =
    document.getElementById("username");

const roomCodeInput =
    document.getElementById("roomCode");

const createRoomButton =
    document.getElementById("createRoom");

const joinRoomButton =
    document.getElementById("joinRoom");

const message =
    document.getElementById("message");


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
                Math.random() *
                characters.length
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


function openRoom(
    roomCode,
    username
) {

    const roomUrl =
        new URL(
            "room.html",
            window.location.href
        );

    roomUrl.searchParams.set(
        "room",
        roomCode
    );

    roomUrl.searchParams.set(
        "name",
        username
    );

    window.location.href =
        roomUrl.href;
}


/* ساخت اتاق */

createRoomButton.addEventListener(
    "click",
    function () {

        const username =
            getUsername();

        if (!username) {
            return;
        }

        const roomCode =
            createRoomCode();

        openRoom(
            roomCode,
            username
        );

    }
);


/* ورود به اتاق */

joinRoomButton.addEventListener(
    "click",
    function () {

        const username =
            getUsername();

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

        openRoom(
            roomCode,
            username
        );

    }
);


/* تبدیل خودکار کد اتاق به حروف بزرگ */

roomCodeInput.addEventListener(
    "input",
    function () {

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


/* اگر کد اتاق از قبل داخل لینک بود */

const params =
    new URLSearchParams(
        window.location.search
    );

const existingRoom =
    params.get("room");

const existingName =
    params.get("name");


if (existingRoom) {

    roomCodeInput.value =
        existingRoom.toUpperCase();

    showMessage(
        "کد اتاق آماده است. نامت را وارد کن و وارد شو."
    );

}


/* اگر اسم قبلاً داخل لینک بود، آن را نگه دار */

if (existingName) {

    usernameInput.value =
        existingName;

}

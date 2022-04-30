// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOFPT0zmAglNPErVl05TZvEkKNVSnrUtY",
  authDomain: "lnt-final-project-5cd1a.firebaseapp.com",
  databaseURL: "https://lnt-final-project-5cd1a-default-rtdb.firebaseio.com",
  projectId: "lnt-final-project-5cd1a",
  storageBucket: "lnt-final-project-5cd1a.appspot.com",
  messagingSenderId: "7888428941",
  appId: "1:7888428941:web:cf5140496357c3df30e7c4",
  measurementId: "G-K01GGRMY27",
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref("Registrasi");

// Show more and show less
$(".more").click(function () {
  $(this).prev().find(".moreText").css("display", "inline");
  $(this).prev().find(".dot").css("display", "none");
  $(this).addClass("d-none");
  $(this).next().removeClass("d-none");
});

$(".less").click(function () {
  $(this).prev().prev().find(".moreText").css("display", "none");
  $(this).prev().prev().find(".dot").css("display", "inline");
  $(this).addClass("d-none");
  $(this).prev().removeClass("d-none");
});

// Registration
function validatenama() {
  let nama = $("#nama");
  if (nama.val().length == 0) {
    nama.css("border-color", "red");
    nama.next().text("Harus diisi");
  } else if (nama.val().length < 3) {
    nama.css("border-color", "red");
    nama.next().text("Minimal 3 karakter");
  } else {
    nama.css("border-color", "green");
    nama.next().text("");
  }
}

function validateEmail() {
  let email = $("#email");
  let counter = 0;
  for (let i = 0; i < email.val().length; i++) {
    if (email.val()[i] == "@") {
      counter = 1;
      break;
    }
  }
  if (email.val().length == 0) {
    email.css("border-color", "red");
    email.next().text("Harus diisi");
  } else if (counter == 0) {
    email.css("border-color", "red");
    email.next().text("Harus ada karakter '@'");
  } else {
    email.css("border-color", "green");
    email.next().text("");
  }
}

function validateTelepon() {
  let telepon = $("#telepon");
  if (telepon.val().length == 0) {
    telepon.css("border-color", "red");
    telepon.next().text("Harus diisi");
  } else if (telepon.val().slice(0, 2) != "08" && telepon.val().length > 14) {
    telepon.css("border-color", "red");
    telepon
      .next()
      .text("2 digit pertama harus '08' dan tidak lebih dari 14 digit");
  } else if (telepon.val().slice(0, 2) != "08") {
    telepon.css("border-color", "red");
    telepon.next().text("2 digit pertama harus '08'");
  } else if (telepon.val().length > 14) {
    telepon.css("border-color", "red");
    telepon.next().text("Maksimal 14 digit");
  } else {
    telepon.css("border-color", "green");
    telepon.next().text("");
  }
}

function validateEvent() {
  let event = $("#event");
  if (event) {
    event.css("border-color", "green");
  }
}

$("#regisForm").submit(function (e) {
  e.preventDefault();
  validatenama();
  validateEmail();
  validateTelepon();
  validateEvent();

  let nama = $("#nama");
  let email = $("#email");
  let telepon = $("#telepon");
  let event = $("#event");

  if (
    nama.css("border-color") == "rgb(0, 128, 0)" &&
    email.css("border-color") == "rgb(0, 128, 0)" &&
    telepon.css("border-color") == "rgb(0, 128, 0)" &&
    event.css("border-color") == "rgb(0, 128, 0)"
  ) {
    // firebase
    let newRegis = database.push();
    newRegis.set({
      nama: nama.val(),
      email: email.val(),
      telepon: telepon.val(),
      event: event.find(":selected").text(),
    });

    // JSON
    jsonObject = {
      nama: "",
      email: "",
      telepon: "",
      event: "",
    };

    jsonObject.nama = nama.val();
    jsonObject.email = email.val();
    jsonObject.telepon = telepon.val();
    jsonObject.event = event.find(":selected").text();

    $.post("http://localhost:3000/registrasi", jsonObject, function () {
      alert("Registrasi BERHASIL!");
    });

    $("#status").text("Registrasi BERHASIL!");
    $("#status").css("color", "green");
    nama.val("");
    email.val("");
    telepon.val("");
    nama.css("border-color", "black");
    email.css("border-color", "black");
    telepon.css("border-color", "black");
    event.css("border-color", "black");
  } else {
    $("#status").text("Registrasi GAGAL!");
    $("#status").css("color", "red");
  }
});

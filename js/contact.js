// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOFPT0zmAglNPErVl05TZvEkKNVSnrUtY",
  authDomain: "lnt-final-project-5cd1a.firebaseapp.com",
  databaseURL: "https://lnt-final-project-5cd1a-default-rtdb.firebaseio.com",
  projectId: "lnt-final-project-5cd1a",
  storageBucket: "lnt-final-project-5cd1a.appspot.com",
  messagingSenderId: "7888428941",
  appId: "1:7888428941:web:a1622bbcdeee6d3830e7c4",
  measurementId: "G-KB6MCTMZLS",
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref("Pesan");

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

function validatePesan() {
  let pesan = $("#pesan");
  if (pesan.val().length == 0) {
    pesan.css("border-color", "red");
    pesan.next().text("Harus diisi");
  } else if (pesan.val().length < 5) {
    pesan.css("border-color", "red");
    pesan.next().text("Minimal 5 karakter");
  } else {
    pesan.css("border-color", "green");
    pesan.next().text("");
  }
}

$("#contactForm").submit(function (e) {
  e.preventDefault();
  validatenama();
  validateEmail();
  validateTelepon();
  validatePesan();

  let nama = $("#nama");
  let email = $("#email");
  let telepon = $("#telepon");
  let pesan = $("#pesan");

  if (
    nama.css("border-color") == "rgb(0, 128, 0)" &&
    email.css("border-color") == "rgb(0, 128, 0)" &&
    telepon.css("border-color") == "rgb(0, 128, 0)" &&
    pesan.css("border-color") == "rgb(0, 128, 0)"
  ) {
    //   Firebase
    let newPesan = database.push();
    newPesan.set({
      nama: nama.val(),
      email: email.val(),
      telepon: telepon.val(),
      pesan: pesan.val(),
    });

    $("#status").text("Kirim pesan BERHASIL!");
    $("#status").css("color", "green");
    nama.val("");
    email.val("");
    telepon.val("");
    pesan.val("");
    nama.css("border-color", "black");
    email.css("border-color", "black");
    telepon.css("border-color", "black");
    pesan.css("border-color", "black");
  } else {
    $("#status").text("Kirim pesan GAGAL!");
    $("#status").css("color", "red");
  }
});

function enviarFormulario() {
  var startDate = document.getElementById("start-date-1").value;
  var endDate = document.getElementById("end-date-1").value;
  var adults = document.querySelector("select[name='adults']").value;
  var children = document.querySelector("select[name='children']").value;
  var email = document.querySelector("input[name='email']").value;
  var phone = document.querySelector("input[name='phone']").value;

  // Realiza una solicitud AJAX para enviar el formulario
  var xhr = new XMLHttpRequest();
  var url = "gracias.php";
  var params =
    "start=" +
    startDate +
    "&end=" +
    endDate +
    "&adults=" +
    adults +
    "&children=" +
    children +
    "&email=" +
    email +
    "&phone=" +
    phone;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Maneja la respuesta del servidor si es necesario
      console.log(xhr.responseText);
    }
  };

  xhr.send(params);
}

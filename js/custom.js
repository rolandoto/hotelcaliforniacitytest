(function ($) {
  "use strict";

  document.documentElement.className = "js";

  //Preloader

  $(window).on("load", function (e) {
    // makes sure the whole site is loaded
    $(".loader__figure").fadeOut(); // will first fade out the loading animation
    $(".loader").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
  });

  //Parallax & fade on scroll

  function scrollBanner() {
    $(document).on("scroll", function () {
      var scrollPos = $(this).scrollTop();
      if ($(window).width() > 1200) {
        $(".parallax-top").css({
          top: scrollPos / 2.5 + "px",
        });
        $(".parallax-fade-top").css({
          top: scrollPos / 2 + "px",
          opacity: 1 - scrollPos / 750,
        });
        $(".fade-top").css({
          opacity: 1 - scrollPos / 350,
        });
      }
    });
  }
  scrollBanner();

  /* Scroll Animation */

  window.scrollReveal = new scrollReveal();

  /* Parallax effect */

  if ($(window).width() > 991) {
    $().enllax();
  }

  //Input number

  jQuery(
    '<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>'
  ).insertAfter(".quantity input");
  jQuery(".quantity").each(function () {
    var spinner = jQuery(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find(".quantity-up"),
      btnDown = spinner.find(".quantity-down"),
      min = input.attr("min"),
      max = input.attr("max");

    btnUp.on("click", function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.on("click", function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
  });

  $(document).ready(function () {
    //Date Picker

    //Date Picker

    var dateSelect = $("#flight-datepicker-1");
    var dateDepart = $("#start-date");
    var dateReturn = $("#end-date");

    // Cambiar formato
    dateSelect.datepicker({
      autoclose: true,
      format: "dd.M",
      maxViewMode: 0,
      startDate: "now",
    });

    dateDepart.datepicker().on("changeDate", function (selected) {
      // Obtener la fecha seleccionada y agregar un día
      var endDate = new Date(selected.date);
      endDate.setDate(endDate.getDate() + 1);

      // Formatear la fecha para que coincida con el formato de datepicker
      var formattedEndDate = endDate
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })
        .toUpperCase();

      // Establecer la nueva fecha de check-out en el datepicker
      dateReturn.val(formattedEndDate);
    });

    //Scroll back to top

    var offset = 300;
    var duration = 400;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".scroll-to-top").fadeIn(duration);
      } else {
        jQuery(".scroll-to-top").fadeOut(duration);
      }
    });

    jQuery(".scroll-to-top").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });

    // Click de Reserva
    $("#reservaLink").on("click", function () {
   
      const requestData = {
        email: $("#email").val(),
        phone: $("#phone").val(),
        start_date: $("#start-date-1").val(),
        end_date: $("#end-date-1").val(),
        number_people: $("#adults").val(),
        number_children: $("#hall").val(),
      };

      // Realiza la solicitud POST
      $.ajax({
        type: "POST",
        url: "./mail.php",
        data: JSON.stringify(requestData),
        dataType: "json",
        success: function (data) {
          alert(data.message);
        },
        error: function (error) {
          console.error(error);
        },
      });
    });

    //Navigation

    ("use strict");

    $(".menu > ul > li:has( > ul)").addClass("menu-dropdown-icon");
    //Checks if li has sub (ul) and adds class for toggle icon - just an UI

    $(".menu > ul > li > ul:not(:has(ul))").addClass("normal-sub");
    //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

    $(".menu > ul").before('<a href="#" class="menu-mobile"></a>');

    //Adds menu-mobile class (for mobile toggle menu) before the normal menu
    //Mobile menu is hidden if width is more then 1199px, but normal menu is displayed
    //Normal menu is hidden if width is below 1199px, and jquery adds mobile menu
    //Done this way so it can be used with wordpress without any trouble

    $(".menu > ul > li").hover(function (e) {
      if ($(window).width() > 1170) {
        $(this).children("ul").stop(true, false).fadeToggle(300);
        e.preventDefault();
      }
    });
    //If width is more than 1170px dropdowns are displayed on hover

    $(".menu > ul > li").on("click", function () {
      if ($(window).width() <= 1170) {
        $(this).children("ul").fadeToggle(300);
      }
    });
    //If width is less or equal to 1170px dropdowns are displayed on click

    $(".menu-mobile").on("click", function (e) {
      $(".menu > ul").toggleClass("show-on-mobile");
      e.preventDefault();
    });
    //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story

    //Nice Select

    $("select").niceSelect();

    /* Quote Carousels */

    $("#owl-sep-1").owlCarousel({
      navigation: false,
      pagination: true,
      transitionStyle: "fade",
      slideSpeed: 500,
      paginationSpeed: 500,
      singleItem: true,
      autoPlay: 5000,
    });

    /* Gallery Carousels */

    $("#owl-sep-2").owlCarousel({
      navigation: false,
      pagination: false,
      slideSpeed: 500,
      paginationSpeed: 500,
      items: 7,
      itemsDesktop: [1000, 4],
      itemsDesktopSmall: [900, 3],
      itemsTablet: [600, 2],
      itemsMobile: false,
      autoPlay: 5000,
    });

    //Rooms Carousel

    var sync1 = $("#rooms-sync1");
    var sync2 = $("#rooms-sync2");

    sync1.owlCarousel({
      singleItem: true,
      slideSpeed: 400,
      transitionStyle: "goDown",
      pagination: false,
      autoPlay: 6000,
      afterAction: syncPosition,
    });
    (function ($) {
      var owl = $("#rooms-sync1");
      owl.owlCarousel();

      // Custom Navigation Events
      $(".next-rooms-sync-1").on("click", function () {
        owl.trigger("owl.next");
      });
      $(".prev-rooms-sync-1").on("click", function () {
        owl.trigger("owl.prev");
      });
    })(jQuery);

    sync2.owlCarousel({
      items: 5,
      itemsDesktop: [1199, 4],
      itemsDesktopSmall: [979, 3],
      itemsTablet: [768, 3],
      itemsMobile: [479, 2],
      pagination: false,
      responsiveRefreshRate: 100,
      afterInit: function (el) {
        el.find(".owl-item").eq(0).addClass("synced");
      },
    });

    function syncPosition(el) {
      var current = this.currentItem;
      $("#rooms-sync2")
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced");
      if ($("#rooms-sync2").data("owlCarousel") !== undefined) {
        center(current);
      }
    }

    $("#rooms-sync2").on("click", ".owl-item", function (e) {
      e.preventDefault();
      var number = $(this).data("owlItem");
      sync1.trigger("owl.goTo", number);
    });

    function center(number) {
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for (var i in sync2visible) {
        if (num === sync2visible[i]) {
          var found = true;
        }
      }

      if (found === false) {
        if (num > sync2visible[sync2visible.length - 1]) {
          sync2.trigger("owl.goTo", num - sync2visible.length + 2);
        } else {
          if (num - 1 === -1) {
            num = 0;
          }
          sync2.trigger("owl.goTo", num);
        }
      } else if (num === sync2visible[sync2visible.length - 1]) {
        sync2.trigger("owl.goTo", sync2visible[1]);
      } else if (num === sync2visible[0]) {
        sync2.trigger("owl.goTo", num - 1);
      }
    }

    //Lang Open/Close

    $(".lang-wrap").on("click", function (e) {
      $(".clicked").removeClass("clicked");
      $(this).addClass("clicked");
      e.stopPropagation();
    });
    $(document).on("click", function () {
      $(".clicked").removeClass("clicked");
    });

    /* Video */

    $(".container").fitVids();

    $(".vimeo a,.youtube a").on("click", function (e) {
      e.preventDefault();
      var videoLink = $(this).attr("href");
      var classeV = $(this).parent();
      var PlaceV = $(this).parent();
      if ($(this).parent().hasClass("youtube")) {
        $(this).parent().wrapAll('<div class="video-wrapper">');
        $(PlaceV).html(
          '<iframe frameborder="0" height="333" src="' +
          videoLink +
          '?autoplay=1&showinfo=0" title="YouTube video player" width="547"></iframe>'
        );
      } else {
        $(this).parent().wrapAll('<div class="video-wrapper">');
        $(PlaceV).html(
          '<iframe src="' +
          videoLink +
          '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;color=6dc234" width="500" height="281" frameborder="0"></iframe>'
        );
      }
    });

    /* Range slider */

    var range = $(".input-range"),
      value = $(".range-value");

    value.html(range.attr("value") + " $");

    range.on("input", function () {
      value.html(this.value + " $");
    });

    //DAG custom modifications
    // Verifica si estás en la página correcta antes de ejecutar el código
    if (window.location.href.includes("index.html")) {
      // Asigna un evento al botón de reserva
      document
        .querySelector(".booking-button-big")
        .addEventListener("click", function () {
          // Obtén valores de los campos en la primera página
          var startDate = document.getElementById("start-date").value;
          var endDateString = document.getElementById("end-date").value;

          // Convertir la cadena de texto en un objeto de fecha
          var endDate = new Date(endDateString);

          // Aumentar un día
          endDate.setDate(endDate.getDate() + 1);
          console.log(endDate);
          var quantity = document.querySelector(".quantity input").value;

          // Crea un objeto con los datos que deseas transferir
          var datos = {
            startDate: startDate,
            endDate: endDateString,
            quantity: quantity,
            // Agrega más propiedades según sea necesario
          };

          // Convierte el objeto a una cadena JSON
          var datosJSON = JSON.stringify(datos);

          // Almacena los datos en localStorage
          localStorage.setItem("datos", datosJSON);
        });
    }

    // Verifica si estás en la página correcta antes de ejecutar el código
    if (window.location.href.includes("search.html")) {
      // Obtiene los datos de localStorage

      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes

        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;

        $("#select_id").on("change", function () {
          var datosLocal = {
            startDate: datos.startDate,
            endDate: datos.endDate,
            quantity: datos.quantity,
            children: this.value,
            // Agrega más propiedades según sea necesario
          };

          var datosJSONOne = JSON.stringify(datosLocal);

          // Almacena los datos en localStorage
          localStorage.setItem("datos", datosJSONOne);
        });
        // O bien, si deseas utilizar valChildren para capturar el valor de children:

        function updateChildren() {
          return $("#select_id").val();
        }

        const byidChildren = updateChildren();

        console.log(byidChildren);

        $("#id-room-detail").click(function () { });

        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });

        // Limpia los datos almacenados en localStorageF
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-gallery.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;

        $(document).ready(function () {
          var select = $('<select class ="nice-select" >')
            .attr("id", "hall")
            .addClass("wide");

          // Agregamos la opción por defecto
          select.append(
            $('<option class="option" >')
              .attr("data-display", "adults")
              .text("adults")
          );

          // Agregamos las opciones del 1 al 5
          for (var i = 1; i <= 5; i++) {
            select.append($("<option>").val(`${i} Aultos`).text(`${i} Aultos`));
          }

          // Agregamos el select al elemento con ID 'container'
          $("#container").append(select);

          // Seleccionamos el valor "4"
          select.val(`${datos.quantity} Aultos`);

          // Añadimos un evento para manejar el cambio de selección
          select.on("change", function () {
            var selectedValue = $(this).val();
            console.log("El valor seleccionado es: " + selectedValue);
          });
        });

        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-twing.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;



        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Niños</span>
              <ul class="list">
                  <li data-value="Niños" class="option selected">Niños</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.children + " Niños"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container-childrem").append(nuevoSelect);
        });

        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-estandar.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;

        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Niños</span>
              <ul class="list">
                  <li data-value="Niños" class="option selected">Niños</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.children + " Niños"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container-childrem").append(nuevoSelect);
        });

        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-jacuzzy.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;

        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Niños</span>
              <ul class="list">
                  <li data-value="Niños" class="option selected">Niños</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.children + " Niños"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container-childrem").append(nuevoSelect);
        });

        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-grupal.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;

        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Niños</span>
              <ul class="list">
                  <li data-value="Niños" class="option selected">Niños</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.children + " Niños"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container-childrem").append(nuevoSelect);
        });
        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-suite.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;

        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Niños</span>
              <ul class="list">
                  <li data-value="Niños" class="option selected">Niños</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.children + " Niños"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container-childrem").append(nuevoSelect);
        });

        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    } else if (window.location.href.includes("rooms-aptos.html")) {
      // Obtiene los datos de localStorage
      var datosJSON = localStorage.getItem("datos");

      if (datosJSON) {
        // Analiza los datos y colócalos en los elementos correspondientes
        var datos = JSON.parse(datosJSON);
        document.getElementById("start-date-1").value = `${datos.startDate} Fecha inicio`;
        document.getElementById("end-date-1").value = `${datos.endDate}  Fecha Final`;;


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Adultos</span>
              <ul class="list">
                  <li data-value="Adultos" class="option selected">Adultos</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.quantity + " Adultos"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container").append(nuevoSelect);
        });


        $(document).ready(function () {
          // Creamos un nuevo elemento div con la clase nice-select wide
          var nuevoSelect = $('<div class="nice-select wide" tabindex="0"></div>');

          // Agregamos el contenido del select existente
          nuevoSelect.append(`
              <span class="current">Niños</span>
              <ul class="list">
                  <li data-value="Niños" class="option selected">Niños</li>
                  <li data-value="1" class="option">1</li>
                  <li data-value="2" class="option">2</li>
                  <li data-value="3" class="option">3</li>
                  <li data-value="4" class="option">4</li>
                  <li data-value="5" class="option">5</li>
              </ul>
          `);

          // Seleccionamos el valor específico
          var valorSeleccionado = datos.children + " Niños"; // Suponiendo que "datos.quantity" contiene el valor deseado
          nuevoSelect.find('.current').text(valorSeleccionado); // Actualizamos el texto de la opción actual
          nuevoSelect.find('.selected').removeClass('selected'); // Removemos la clase 'selected' del elemento actualmente seleccionado
          nuevoSelect.find(`[data-value="${valorSeleccionado}"]`).addClass('selected'); // Agregamos la clase 'selected' al elemento con el valor seleccionado

          // Agregamos el nuevo select al elemento con ID 'container-childrem'
          $("#container-childrem").append(nuevoSelect);
        });

        // Limpia los datos almacenados en localStorage
        // localStorage.removeItem("datos");
      } else {
        console.log("No se encontraron datos en localStorage.");
      }
    }
  });
})(jQuery);

'use strict';

document.addEventListener('DOMContentLoaded', () => {

	// Dropdown header submenu

	const subMenu = document.querySelector('.header__submenu'),
	subMenuRelative = document.querySelector('.header__sub');

	subMenuRelative.addEventListener('mouseover', (e) => {
	subMenu.classList.add('header__submenu_active');
	});

	subMenu.addEventListener('mouseout', (e) => {
	subMenu.classList.remove('header__submenu_active');
	});

	// Mobile Menu

	const mobMenu = document.querySelector('.mob-menu'),
	checkbox = document.getElementById('checkbox'),
	services = document.querySelector('[data-services]'),
	mobSubMenu = document.querySelector('.mob-menu__sublist'),
	mobServicesIcon = document.querySelector('.mob-menu__icon');

	// Open mobile menu
	checkbox.addEventListener('click', (e) => {
	mobMenu.classList.toggle('mob-menu_active');
	});

	// Dropdown mobile submenu
	services.addEventListener('click', (e) => {
	mobSubMenu.classList.toggle('mob-menu__sublist_active');
	mobServicesIcon.classList.toggle('mob-menu__icon_rotate');
	});

	// Scroll opening and closing pop-up

	const popUp = document.querySelector('.pop-up'),
	popUpClose = document.querySelector('.pop-up__close');

	let popUpClosed = false;

	window.addEventListener('scroll', function() {
	if (!popUpClosed && this.window.scrollY > 1100) {
	popUp.style.display = 'flex';
	} else {
	popUp.style.display = 'none';
	}
	});

	popUpClose.addEventListener('click', function() {
	popUp.style.display = 'none';
	popUpClosed = true;
	})

	// Modal

	$('[data-modal=order]').on('click', function() {
	$('.overlay, #order').fadeIn('slow');
	});

	// $('[data-modal=order]').each(function(i) {
	// 	$(this).on('click', function() {
	// 		$('#order .modal__descr').text($('[data-title]').eq(i).text());
	// 		$('.overlay, #order').fadeIn('slow');
	// 	})
	// });

	$('.modal__close').on('click', function() {
	$('.overlay, #thx, #order').fadeOut('slow');
	});

	// Form Validate

	function validateForms(form){
	$(form).validate({
	rules: {
		name: {
			required: true,
			minlength: 3,
			maxlength: 15
		},
		phone: "required"
	},
	messages: {
		name: {
			required: "Будь ласка, введіть своє ім'я",
			minlength: jQuery.validator.format("Введіть мінімум {0} символів!"),
			maxlength: jQuery.validator.format("Максимум {0} символів!")
			},
		phone: "Будь ласка, введіть свій номер телефону"
	},
	errorClass: "form__error"
	});
	};

	// validateForms('#cta');
	validateForms('#cta');
	validateForms('#order form');

	// Phone mask

	$('[name=phone]').mask("+38 (099) 999-99-99");

	$('#cta').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#cta').fadeOut();
			$('.cta__thx').fadeIn('slow');

			$('#cta').trigger('reset');

			dataLayer.push({
				'event': 'formSubmit', // Название события
				'formId': $form.attr('#cta'), // ID формы (или используйте другой уникальный идентификатор)
			});
		});
		return false;
	});



	$('#order form').submit(function(e) {
		e.preventDefault();

		if(!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#order').fadeOut();
			$('.overlay, #thx').fadeIn('slow');

			$('#order form').trigger('reset');
		
			dataLayer.push({
				'event': 'formSubmit',
				'formId': $form.attr('#order form'),
			});
		});

		return false;
	});
});
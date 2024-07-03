$(document).ready(function(){

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
		$('.overlay, #consultation, #thx, #order').fadeOut('slow');
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

	validateForms('#consultation form');
	validateForms('#order form');

	// Phone mask

	$('[name=phone]').mask("+38 (099) 999-99-99");

	// Sending email

	$('form, form-modal').submit(function(e) {
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
			$('#order').fadeOut();
			$('.overlay, #thx').fadeIn('slow');

			$('form').trigger('reset');

			dataLayer.push({
				'event': 'FormSubmit', // Название события
				'formId': $form.attr('[data-id=form]'), // ID формы (или используйте другой уникальный идентификатор)
			});
		});
		return false;
	});

})
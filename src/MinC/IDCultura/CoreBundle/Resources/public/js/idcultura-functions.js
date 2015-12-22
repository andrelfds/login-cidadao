// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// Add .osx class to html if on Os/x
if ( navigator.appVersion.indexOf("Mac")!=-1 ) 
	jQuery('html').addClass('osx');

// When DOM is fully loaded
jQuery(document).ready(function($) {

/* --------------------------------------------------------
         Toggle dos formularios de registro e login
	 --------------------------------------------------------     */
    var current_url = window.location.pathname;
    
        $('#send').click(function() { 
	    // home: alterna entre formularios
	    if (current_url === '/') {
		if ($('#send').attr('value') === 'entrar') {
		    $('#registrar').fadeOut();
		    $('#entrar-no-sistema').fadeIn();
		    $('#send').attr('value', 'cadastrar');
		    $('#send').delay(200).queue(function(n) { 
			$(this).html('<i class="icon-user"></i> Criar conta '); n();
		    });
		} else if ($('#send').attr('value') === 'cadastrar') {
		    $('#registrar').fadeIn();
		    $('#entrar-no-sistema').fadeOut();
		    $('#send').attr('value', 'entrar');
		    $('#send').delay(200).queue(function(n) { 
			$(this).html('<i class="icon-user"></i> Entrar '); n();
		    });		   
		}
	    } else {
		window.location.href = '/';
	    }
        });
        
        // if form return / validation error (only at login)
    if($('#login_form_type_username').val() !== '' && current_url === '/') {
            $('#registrar').hide();
            $('#entrar-no-sistema').show();
            $('#send').attr('value', 'cadastrar');
            $('#send').html('<i class="icon-user"></i> Criar conta ');
        } 

    // aumenta pagina se menu for maior que conteudo
    if($('.nav-pills').length) {
	var y_menu = $('.nav-pills').height(),
	    y_content = $('.settings-content').height();
	
	if (y_menu > y_content) {
	    $('.settings-content').css('margin-bottom', y_menu - y_content);
	}
    }

/* --------------------------------------------------------	
	 External Links
   --------------------------------------------------------	*/	

	(function() {
	    $(window).load(function() {
			$('a[rel=external]').attr('target','_blank');	
		});                                            
	})();  

/* --------------------------------------------------------	
	 Responsive Navigation
   --------------------------------------------------------	*/	
	
	(function() {

		var $mainNav    = $('.navbar .nav'),
			responsiveNav = '';

		// Responsive nav
		$mainNav.find('li').each(function() {
			var $this   = $(this),
				$link = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';

			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}
			}

			if ($link.text())
				responsiveNav += '<option ' + ($this.hasClass('active') ? 'selected="selected"':'') + ' value="' + $link.attr('href') + '">' + indent + ' ' + $link.text() + '</option>';

		}).end().after('<select class="nav-responsive">' + responsiveNav + '</select>');

		$('.nav-responsive').on('change', function() {
			window.location = $(this).val();
		});
			
	})();      

});

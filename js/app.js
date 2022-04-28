// Device detection
	var isMobile = false; //initiate as false
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
	}

// Document load functions
	$(window).on("load", function() { // Detects device orientation
		if (window.screen.height > window.screen.width) { // Portrait
			viewModel.orientation("portrait");
			viewModel.menuSymbol(viewModel.sandwichSymbol());
			$(".menu-cell").css("left","-100vw");
		} else { // Landscape
			viewModel.orientation("landscape");
			viewModel.menuSymbol('');
			$(".menu-cell").css("left","0vw");
		}

		ko.applyBindings(viewModel); // Applies knockout bindings


		// Detect swipes on touch devices
			let touchstartX = 0; let touchendX = 0; let touchstartY = 0; let touchendY = 0;
			const slider = $(".bottom-row")[0];

			function handleGesture() { // Handles swipes
				if (Math.abs(touchstartX-touchendX) > Math.abs(touchstartY-touchendY)) {
					if (viewModel.activePage() == "portfolio") {
						if (touchstartX-touchendX > 80 && viewModel.activePageNr() < viewModel.portfolioTitles().length - 1) { // Swipe left
							prevAndNext("next");
						} else if (touchendX-touchstartX > 80 && viewModel.activePageNr() > 0) { // Swipe right
							prevAndNext("previous");
						}
					}
				}
			}

			slider.addEventListener('touchstart', e => {
			  touchstartX = e.changedTouches[0].screenX;
			  touchstartY = e.changedTouches[0].screenY;
			});

			slider.addEventListener('touchend', e => {
			  touchendX = e.changedTouches[0].screenX;
			  touchendY = e.changedTouches[0].screenY;
			  handleGesture();
			});
	});

	function lightOrDarkMode() { // Detects browser's dark or light mode
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		    $("#logoicon").attr("href","images/whitelogo.png");
		} else {
			$("#logoicon").attr("href","images/logo.png");
		}
	}
	lightOrDarkMode();

// Listeners
	window.addEventListener('resize', function() { // Detects changes on the device's orientation when resizing the window
                if (window.screen.height > window.screen.width) { // Portrait
                        viewModel.orientation("portrait");
                        viewModel.menuSymbol(viewModel.sandwichSymbol());
                        $(".menu-cell").css("left","-100vw");
                } else { // Landscape
                        viewModel.orientation("landscape");
                        viewModel.menuSymbol('');
                        $(".menu-cell").css("left","0vw");
                 }
	});

	$(window).bind("orientationchange", function(evt){ // Detects changes on the device's orientation
                if (window.screen.height > window.screen.width) { // Portrait
			viewModel.orientation("portrait");
			viewModel.menuSymbol(viewModel.sandwichSymbol());
			$(".menu-cell").css("left","-100vw");
		} else { // Landscape
			viewModel.orientation("landscape");
			viewModel.menuSymbol('');
			$(".menu-cell").css("left","0vw");
		}
	});

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) { // Detects browser's dark or light mode change
		lightOrDarkMode();
	});

// UI functions
	function prevAndNext(sense) {
		if (sense == "previous") {
			slideDiv("out", "activeleft", "right");
			slideDiv("out", "activeright", "right");
			viewModel.activePageNr(viewModel.activePageNr() - 1);
			setTimeout(function(){
				slideDiv("in", "activeleft", "right");
				slideDiv("in", "activeright", "right");
			}, 200);
		} else if (sense == "next") {
			slideDiv("out", "activeleft", "left");
			slideDiv("out", "activeright", "left");
			viewModel.activePageNr(viewModel.activePageNr() + 1);
			setTimeout(function(){
				slideDiv("in", "activeleft", "left");
				slideDiv("in", "activeright", "left");
			}, 200);
		}
	}

	function slideDiv(inOut, id, direction) {
		var element = document.getElementById(id);
		if (inOut == "inslow") {
			if (direction == "left") {
				$(element).addClass("slide-right");
			} else if (direction == "right") {
				$(element).addClass("slide-left");
			}
			setTimeout(function(){
				$(element).removeClass("slide-right");
				$(element).removeClass("slide-left");
			}, 1000);	
		} else if (inOut == "in") {
			if (direction == "left") {
				$(element).addClass("slidein-right");
			} else if (direction == "right") {
				$(element).addClass("slidein-left");
			}
			setTimeout(function(){
				$(element).removeClass("slidein-right");
				$(element).removeClass("slidein-left");
			}, 200);
		} else if (inOut == "out") {
			if (direction == "left") {
				$(element).addClass("slideout-right");
			} else if (direction == "right") {
				$(element).addClass("slideout-left");
			}
			setTimeout(function(){
				$(element).removeClass("slideout-right");
				$(element).removeClass("slideout-left");
			}, 200);
		}
	}

	function changeFlipDiv(page) {
		if (page != viewModel.activePage()) { // If clicked page isn't the same as the current page
			document.getElementById("alert_message").value = "";
			// Flip divs
				// Flip long divs
					viewModel.flipDiv("flip12", "lower-top-row");
					viewModel.flipDiv("flip13", "lower-top-row");
				// Flip big divs
					viewModel.flipDiv("flip14", "bottom-row-left");
					viewModel.flipDiv("flip15", "bottom-row-right");
			
			// Update activeFlips & get old and new elements
				if (viewModel.activeFlip() == "front") {
					viewModel.activeFlip("back");
					newMainLeft = document.getElementById("main_left_back");
					newMainRight = document.getElementById("main_right_back");
					oldMainLeft = document.getElementById("main_left_front");
					oldMainRight = document.getElementById("main_right_front");

					newLongLeft = document.getElementById("long_left_back");
					newLongRight = document.getElementById("long_right_back");
					oldLongLeft = document.getElementById("long_left_front");
					oldLongRight = document.getElementById("long_right_front");
				} else if (viewModel.activeFlip() == "back") {
					viewModel.activeFlip("front");
					newMainLeft = document.getElementById("main_left_front");
					newMainRight = document.getElementById("main_right_front");
					oldMainLeft = document.getElementById("main_left_back");
					oldMainRight = document.getElementById("main_right_back");

					newLongLeft = document.getElementById("long_left_front");
					newLongRight = document.getElementById("long_right_front");
					oldLongLeft = document.getElementById("long_left_back");
					oldLongRight = document.getElementById("long_right_back");
				}

			// Create new content
				viewModel.activePageNr(0);
				if (page == "home") {
					viewModel.activePage("home");
					$(newMainLeft).html("<div id='splashleft'></div>");
					$(newMainRight).html("<a id='mainCode' class='this_code_link' data-bind='text: english() ? text.mainCodeEN() : text.mainCodeFR()' target='_blank' href='https://github.com/MigP/Portfolio'></a><div id='splashright'></div>");
					ko.applyBindings(viewModel, $("#mainCode")[0]);
                                        // Slide new content in
						slideDiv("inslow", "splashleft", "right");
						slideDiv("inslow", "splashright", "left");
				} else {
					viewModel.activePage(page);
					viewModel.bigLeftFlip(newMainLeft);
					viewModel.bigRightFlip(newMainRight);
					viewModel.longLeftFlip(newLongLeft);
					viewModel.longRightFlip(newLongRight);

					// Slide new content in
						slideDiv("inslow", "activeleft", "right");
						slideDiv("inslow", "activeright", "left");
				}
			
			// Erase old content
				$(oldMainLeft).html("");
				$(oldMainRight).html("");
				$(oldLongLeft).html("");
				$(oldLongRight).html("");
		}
	}

function sendMessage(){
	$name = document.getElementById("name").value;
	$email = document.getElementById("email").value;
	$message = document.getElementById("message").value;

    let rx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    valid_email = rx.test($email);

	if ($name != "" && $email != "" && $message != "") {
		if (valid_email) {
		    $.ajax({
		        url: "includes/contact_form_handler.php",
		        data: {name: $name, email: $email, message: $message},
		        type: "POST",
				success: function (response) {
                                        if (response == "success") {
                                                document.getElementById("message").value = "";
                                                document.getElementById("name").value = "";
                                                document.getElementById("email").value = "";
                                                console.log(response);
                                        }

				}
		    });
	    	viewModel.activeAlertMessage(3);
		} else {
	    	viewModel.activeAlertMessage(2);
		}
	} else {
	    viewModel.activeAlertMessage(1);
	}
}
// viewModel
	var viewModel = {
		text: {
			yourEmailEN: ko.observable("Your email:"),
			yourEmailFR: ko.observable("Votre email:"),
			sendEN: ko.observable("Send"),
			sendFR: ko.observable("Envoyer"),
			yourNameEN: ko.observable("Your name:"),
			yourNameFR: ko.observable("Votre nom:"),
			yourMessageEN: ko.observable("Your message:"),
			yourMessageFR: ko.observable("Votre message:"),
			prevProjEN: ko.observable("Previous Project"),
			prevProjFR: ko.observable("Projet Précédent"),
			nextProjEN: ko.observable("Next Project"),
			nextProjFR: ko.observable("Projet Suivant"),
			portfolioEN: ko.observable("Portfolio"),
			portfolioFR: ko.observable("Portfolio"),
			educationEN: ko.observable("Education"),
			educationFR: ko.observable("Études"),
			workEN: ko.observable("Work"),
			workFR: ko.observable("Emploi"),
			aboutEN: ko.observable("About"),
			aboutFR: ko.observable("Qui suis-je"),
			contactEN: ko.observable("Contact"),
			contactFR: ko.observable("Contact"),
			lightEN: ko.observable("Light"),
			lightFR: ko.observable("Clair"),
			darkEN: ko.observable("Dark"),
			darkFR: ko.observable("Foncé"),
			englishEN: ko.observable("English"),
			englishFR: ko.observable("Anglais"),
			frenchEN: ko.observable("French"),
			frenchFR: ko.observable("Français"),
			livesiteEN: ko.observable("═ Live website ═"),
			livesiteFR: ko.observable("═ Site web en ligne ═"),
			sitecodeEN: ko.observable("═ Website code ═"),
			sitecodeFR: ko.observable("═ Code du site web ═"),
			workExpEN: ko.observable("Work experience"),
			workExpFR: ko.observable("Expérience professionnelle"),
			trainEdEN: ko.observable("Training / Education"),
			trainEdFR: ko.observable("Formations / Éducation"),
			abEN: ko.observable("About myself"),
			abFR: ko.observable("Qui suis-je?"),
                        mainCodeEN: ko.observable("Link to website code"),
                        mainCodeFR: ko.observable("Lien du code de ce site"),

			portfolioTechniquesEN: ko.observable(['Login system, database integration, graph creation, API calls, responsive UI, multilanguage interface, dynamic content creation, animations, sortable lists, draggable content', 'Database integration, responsive UI, multilanguage interface, dynamic content creation, search functionality', 'Responsive UI, dynamic content creation, search functionality, list filtering, animations, API calls', 'Canvas animations, game engine creation']),
			portfolioTechniquesFR: ko.observable(['Système de connexion, intégration de base de données, création de graphiques, appels d\'API, interface utilisateur réactive, interface multilingue, création dynamique de contenu, animations, listes triables, contenu glissable', 'Intégration de base de données, interface utilisateur réactive, interface multilingue, création dynamique de contenu, fonctionnalité de recherche', 'Interface utilisateur réactive, création dynamique de contenu, fonctionnalité de recherche, filtrage de liste, animations, appels d\'API', 'Animations Canvas, création de moteur de jeu']),
			portfolioSummaryEN: ko.observable(['PortFollow allows you to keep track of your portfolio of financial assets. With the help of charts you can easily visualise price fluctuations, comparisons, and trends.', 'The fourth Portuguese Presidency of the Council of the European Union ran from 1 January to 30 June 2021. I have worked on this as part of a team.', 'This site lists points of interest in the city of Porto and displays information and photos relevant to each of them by calling data from several APIs.', 'Bug Attack is a game in which you have to cross a road whilst avoiding being hit by frantic bugs. In doing so, you can collect bonuses which give you extra time, points, and lives.']),
			portfolioSummaryFR: ko.observable(['PortFollow vous permet de suivre l\'évolution de votre portefeuille d\'actifs financiers. À l\'aide de graphiques, vous pouvez facilement visualiser les fluctuations de prix, les comparaisons et les tendances.', 'La quatrième présidence portugaise du Conseil de l\'Union européenne s\'est déroulée du 1er janvier au 30 juin 2021. J\'ai travaillé sur ce projet en équipe.', 'Ce site répertorie les points d\'intérêt dans la ville de Porto et affiche des informations et des photos pertinentes pour chacun d\'eux en appelant les données de plusieurs API.', 'Bug Attack est un jeu dans lequel vous devez traverser une route tout en évitant d\'être touché par des insectes frénétiques. Ce faisant, vous pouvez collecter des bonus qui vous donnent plus de temps, de points et de vies.'])
		},
		activePageNr: ko.observable(0),
		activePage: ko.observable('home'),
		activeFlip: ko.observable('front'),
		orientation: ko.observable(),

		portfolioTitles: ko.observable(['PortFollow', 'PPUE-2021', 'Neighbourhood Map - Porto', 'Bug Attack']),
		portfolioLiveLinks: ko.observable(['http://portfollow.miguelpinto.dx.am/login.php', 'https://www.2021portugal.eu/', 'https://migp.github.io/Neighbourhood-map-Porto/', 'https://migp.github.io/Bug-Attack/']),
		portfolioCodeLinks: ko.observable(['https://github.com/MigP/PortFollow', '#', 'https://github.com/MigP/Neighbourhood-map-Porto', 'https://github.com/MigP/Bug-Attack']),
		portfolioShowCode: ko.observable([true, false, true, true]),
		portfolioListItems: ko.observable(['<li>HTML</li><li>CSS</li><li>Javascript</li><li>jQuery</li><li>SQL</li><li>AJAX</li><li>PHP</li><li>Bootstrap</li><li>Knockout</li>', '<li>HTML</li><li>CSS</li><li>Javascript</li><li>jQuery</li><li>SQL</li><li>AJAX</li><li>PHP</li>', '<li>HTML</li><li>CSS</li><li>Javascript</li><li>jQuery</li><li>AJAX</li><li>Bootstrap</li><li>Knockout</li>', '<li>HTML</li><li>CSS</li><li>Javascript</li><li>jQuery</li>']),
		portfolioLargeImgs: ko.observable(['images/PortFollow_large.png', 'images/PPUE21_large.png', 'images/Neighbourhood_map_large.png', 'images/Bug_attack_large.png']),
		portfolioSmallImgs: ko.observable(['images/PortFollow_small.png', 'images/PPUE21_small.png', 'images/Neighbourhood_map_small.png', 'images/Bug_attack_small.png']),

		portfolioLeftPages: ko.observable(["<div id='activeleft'><div style='width: 100%;display: flex;flex-flow: row;height: 50%;'><div style='line-height: 1;display: flex;flex-flow: column;height: 100%;width: 60%;'><div class='portfolio_title'><span data-bind='text: portfolioTitles()[activePageNr()]'></span></div><div class='portfolio_image' style='width: 100%;'><img style='width: 100%;' data-bind='attr: {src: portfolioImg()}'></div></div><div class='portfolio_list'><ul class='portfolio_items' data-bind='html: portfolioListItems()[activePageNr()]'></ul></div></div><div class='portfolio_desc' data-bind='text: english() ? text.portfolioTechniquesEN()[activePageNr()] : text.portfolioTechniquesFR()[activePageNr()]'></div></div>"]),
		portfolioRightPages: ko.observable(["<div id='activeright'><div style='display: flex;flex-direction: column;'><div class='port_sum' data-bind='text: english() ? text.portfolioSummaryEN()[activePageNr()] : text.portfolioSummaryFR()[activePageNr()]'></div><div class='port_links'><a target='_blank' data-bind='attr: { href: portfolioLiveLinks()[activePageNr()] }, text: english() ? text.livesiteEN() : text.livesiteFR()'></a></div><div class='port_links'><a target='_blank' data-bind='visible: portfolioShowCode()[activePageNr()], attr: { href: portfolioCodeLinks()[activePageNr()] }, text: english() ? text.sitecodeEN() : text.sitecodeFR()'></a></div></div></div>"]),
		longLeftPage: ko.observable("<div id='long_cell_left' style= 'display: flex;flex-direction: row;align-content: space-around;height: 100%;width: 100%;position: relative;'><div onclick='prevAndNext(\"previous\");' data-bind='visible: orientation() == \"landscape\" && viewModel.activePageNr() > 0' class='long_item' onmouseover='this.children[0].children[0].src = \"images/left_hover.png\"; this.style.cursor=\"pointer\"' onmouseout='this.children[0].children[0].src = \"images/left.png\"; this.style.cursor=\"default\"'><div style= 'width: 20%;align-items: center;height: auto;display: flex;justify-content: start;padding: 0.5em;'><img src='images/left.png' style= 'height: 50%;width: auto;'></div><div class='long_span_txt' style= 'justify-content: start;'><span data-bind='text: english() ? text.prevProjEN() : text.prevProjFR()'></span></div></div><div class='long_item'><div class='long_span_txt'style= 'justify-content: end;'></div><div style= 'width: 20%;align-items: center;height: auto;display: flex;justify-content: end;padding: 0.5em;'></div></div></div>"),
		longRightPage: ko.observable("<div id='long_cell_right' style= 'display: flex;flex-direction: row;align-content: space-around;height: 100%;width: 100%;position: relative;'><div data-bind='visible: orientation() == \"landscape\" || viewModel.activePageNr() == 0' class='long_item'></div><div onclick='prevAndNext(\"previous\");' data-bind='visible: orientation() == \"portrait\" && viewModel.activePageNr() > 0' class='long_item' onmouseover='this.children[0].children[0].src = \"images/left_hover.png\"; this.style.cursor=\"pointer\"' onmouseout='this.children[0].children[0].src = \"images/left.png\"; this.style.cursor=\"default\"'><div style= 'width: 20%;align-items: center;height: auto;display: flex;justify-content: start;padding: 0.5em;'><img src='images/left.png' style= 'height: 50%;width: auto;'></div><div class='long_span_txt' style= 'justify-content: start;'><span data-bind='text: english() ? text.prevProjEN() : text.prevProjFR()'></span></div></div><div onclick='prevAndNext(\"next\");' data-bind='visible: viewModel.activePageNr() < viewModel.portfolioTitles().length - 1' class='long_item' onmouseover='this.children[0].children[0].src = \"images/right_hover.png\"; this.style.cursor=\"pointer\"' onmouseout='this.children[0].children[0].src = \"images/right.png\"; this.style.cursor=\"default\"'><div class='long_span_txt'style= 'justify-content: end;'><span data-bind='text: english() ? text.nextProjEN() : text.nextProjFR()'></span></div><div style= 'width: 20%;align-items: center;height: auto;display: flex;justify-content: end;padding: 0.5em;'><img src='images/right.png' style= 'height: 50%;width: auto;'></div></div></div>"), 

		educationLeftPages: ko.observable(["<div id='activeleft2' data-bind='html: english() ? educationLeftPagesEN()[activePageNr()] : educationLeftPagesFR()[activePageNr()]'></div>"]),
		educationRightPages: ko.observable(["<div id='activeright2' data-bind='html: english() ? educationRightPagesEN()[activePageNr()] : educationRightPagesFR()[activePageNr()]'></div>"]),
		educationLeftPagesEN: ko.observable(["<p><span class='edTitle'>Deelcertificat (A1 & A2)</span><br><span class='edPlace'>CVO Lethas – Huis van het Nederlands, Brussels</span><br><span class='edDate'>MAY 2018 - NOVEMBER 2018</span><br><span class='edList'>▪ Dutch language course.</span></p><p><span class='edTitle'>Udacity Nanodegree Diploma</span><br><span class='edPlace'>Udacity.com</span><br><span class='edDate'>MARCH 2017 – JULY 2017</span><br><span class='edList'>▪ Front-end web development.</span></p><p><span class='edTitle'>Microsoft Certified Web Design Certificate </span><br><span class='edPlace'>Oxford House Computer Training, London</span><br><span class='edDate'>JANUARY 2001 – JULY 2001</span><br><span class='edList'>▪ Web Design (HTML, CSS, Dreamweaver, Flash, Photoshop).</span></p>"]),
		educationLeftPagesFR: ko.observable(["<p><span class='edTitle'>Deelcertificat (A1 & A2)</span><br><span class='edPlace'>CVO Lethas – Huis van het Nederlands, Bruxelles</span><br><span class='edDate'>MAI 2018 - NOVEMBRE 2018</span><br><span class='edList'>▪ Cours de néerlandais.</span></p><p><span class='edTitle'>Udacity Nanodegree Diploma</span><br><span class='edPlace'>Udacity.com</span><br><span class='edDate'>MARS 2017 – JUILLET 2017</span><br><span class='edList'>▪ Développement Web Frontend.</span></p><p><span class='edTitle'>Microsoft Certified Web Design Certificate </span><br><span class='edPlace'>Oxford House Computer Training, Londres</span><br><span class='edDate'>JANVIER 2001 – JUILLET 2001</span><br><span class='edList'>▪ Web Design (HTML, CSS, Dreamweaver, Flash, Photoshop).</span></p>"]),
		educationRightPagesEN: ko.observable(["<p><span class='edTitle'>BSc Software Engineering</span><br><span class='edPlace'>South Bank University (SBU), London</span><br><span class='edDate'>SEPTEMBER 1994 – AUGUST 1998</span><br><span class='edList'>▪ Software engineering.</span></p><p><span class='edTitle'>Computing (first year only)</span><br><span class='edPlace'>Université Libre de Bruxelles (ULB), Brussels</span><br><span class='edDate'>SEPTEMBER 1993 – AUGUST 1994</span><br><span class='edList'>▪ Computing.</span></p><p><span class='edTitle'>European Baccalaureate Certificate (BAC)</span><br><span class='edPlace'>European School, Luxembourg</span><br><span class='edDate'>SEPTEMBER 1987 – JULY 1993</span><br><span class='edList'>▪ Secondary school.</span></p>"]),
		educationRightPagesFR: ko.observable(["<p><span class='edTitle'>BSc Software Engineering</span><br><span class='edPlace'>South Bank University (SBU), Londres</span><br><span class='edDate'>SEPTEMBRE 1994 – AOÛT 1998</span><br><span class='edList'>▪ Software engineering.</span></p><p><span class='edTitle'>Informatique (première année seulement)</span><br><span class='edPlace'>Université Libre de Bruxelles (ULB), Bruxelles</span><br><span class='edDate'>SEPTEMBRE 1993 – AOÛT 1994</span><br><span class='edList'>▪ Informatique.</span></p><p><span class='edTitle'>Certificat de baccalauréat européen (BAC)</span><br><span class='edPlace'>École Européenne, Luxembourg</span><br><span class='edDate'>SEPTEMBRE 1987 – JUILLET 1993</span><br><span class='edList'>▪ École secondaire.</span></p>"]),

		workLeftPagesEN: ko.observable(["<p><span class='workTitle'>Technical assistant</span><br><span class='workPlace'>REPER – Portuguese Permanent Representation to the European Union, Brussels - <span class='workDate'>SEPTEMBER 2019 – JULY 2021</span></span><br><span class='workList'>▪ Encryption and IT.</span><br><span class='workList'>▪ Creation and editing of online and intranet content during the period of the Portuguese Presidency of the EU.</span><br><span class='workList'>▪ Communications encryption.</span></p><p><span class='workTitle'>Graphic/Web design and  digital media (volonteer)</span><br><span class='workPlace'>ERIO (European Roma Information Office), Brussels - <span class='workDate'>SEPTEMBER 2012 – AUGUST 2019</span></span><br><span class='workList'>▪ Provided web and graphic design for various projects and the company’s own web page.</span><br><span class='workList'>▪ Created and edited digital media content for various projects, such as video documentaries and awareness campaigns.</span></p>"]),
		workLeftPagesFR: ko.observable(["<p><span class='workTitle'>Assistant technique</span><br><span class='workPlace'>REPER – Représentation Permanente du Portugal auprès de l’Union Européene, Bruxelles - <span class='workDate'>SEPTEMBRE 2019 – JUILLET 2021</span></span><br><span class='workList'>▪ Chiffrement et informatique.</span><br><span class='workList'>▪ Création et édition de contenu online et intranet pendant la période de la présidence Portugaise de l’UE.</span><br><span class='workList'>▪ Chiffrement de communications.</span></p><p><span class='workTitle'>Graphisme / Web design et medias numériques (volontaire)</span><br><span class='workPlace'>ERIO (European Roma Information Office), Bruxelles - <span class='workDate'>SEPTEMBRE 2012 – AOÛT 2019</span></span><br><span class='workList'>▪ Conception web et graphique pour divers projets et la page web de l’organisation.</span><br><span class='workList'>▪ Création et édition de contenu multimédia numérique pour divers projets, tels que des documentaires vidéo et des campagnes de sensibilisation.</span></p>"]),
		workRightPagesEN: ko.observable(["<p><span class='workTitle'>Database maintenance and general secretarial work</span><br><span class='workPlace'>Awesome Interiors, London - <span class='workDate'>NOVEMBER 1998 – APRIL 2001</span></span><br><span class='workList'>▪ Maintained and updated the company’s databases with products, clients, and sales.</span></p><p><span class='workTitle'>Freelance data entry (with some basic translation)</span><br><span class='workPlace'>European Parliament, Luxembourg - <span class='workDate'>DECEMBER 1992 – DECEMBER 1994</span></span><br><span class='workList'>▪ Added specialised data to terminology databases in French, English, and Portuguese, and verified whether the correct translations were used.</span></p>"]),
		workRightPagesFR: ko.observable(["<p><span class='workTitle'>Maintien de la base de données et secrétariat général</span><br><span class='workPlace'>Awesome Interiors, Londres - <span class='workDate'>NOVEMBRE 1998 – AVRIL 2001</span></span><br><span class='workList'>▪ Maintien et mise à jour des bases de données de l’entreprise avec les produits, les clients, et les ventes.</span></p><p><span class='workTitle'>Entrée de données avec quelques traductions de base (Freelance)</span><br><span class='workPlace'>Parlement Européen, Luxembourg - <span class='workDate'>DÉCEMBRE 1992 – DÉCEMBRE 1994</span></span><br><span class='workList'>▪ Entrée de données spécialisés aux bases de données terminologiques en français, anglais et portugais et vérification de l’utilisation des traductions correctes.</span></p>"]),
		workLeftPages: ko.observable(["<div id='activeleft3' data-bind='html: english() ? workLeftPagesEN()[activePageNr()] : workLeftPagesFR()[activePageNr()]'></div>"]),
		workRightPages: ko.observable(["<div id='activeright3' data-bind='html: english() ? workRightPagesEN()[activePageNr()] : workRightPagesFR()[activePageNr()]'></div>"]),
	
		aboutLargeImgs: ko.observable(['images/pic_large.jpg']),
		aboutSmallImgs: ko.observable(['images/pic_small.jpg']),	
		aboutLeftPagesEN: ko.observable(["Hello!<br>My name is Miguel and I enjoy creating online content and experimenting with techniques that improve functionality and increase enjoyment.<br><br>Althought software engineering is my base, I am comfortable with a variety of tools for the creation of digital content, be it Photoshop or Illustrator for graphic design, After Effects or Premiere for video editing and creation, or Audition for audio editing.<br><br>Whichever the tools I use, I thrive on bringing ideas to life and take pride in crafting innovative solutions to problems."]),
		aboutLeftPagesFR: ko.observable(["Bonjour!<br>Je m'appelle Miguel et j'aime créer du contenu en ligne et expérimenter des techniques qui améliorent la fonctionnalité et augmentent le plaisir.<br><br>Bien que la programmation soit ma base, je suis à l'aise avec une variété d'outils pour la création de contenu numérique, que ce soit Photoshop ou Illustrator pour la conception graphique, After Effects ou Premiere pour le montage et la création vidéo, ou Audition pour le montage audio.<br><br>Quels que soient les outils que j'utilise, je m'épanouis en donnant vie à des idées et je suis fier de concevoir des solutions innovantes aux problèmes."]),
		aboutRightPagesEN: ko.observable(["My interest in software started back in the mid 80s when I was gifted my very first computer - a Timex Sinclair 2068 with its astounding 48Kb RAM and 24Kb ROM. I soon began altering simple game features using Basic.<br><br>\"Born in Porto, raised in Luxembourg, matured in London, and settled in Brussels\" would perhaps be the one-liner that sums up the experiences that most deeply shaped my life. It instilled in me a deeply ingrained love for travel, languages, and flourishing outside my comfort zone."]),
		aboutRightPagesFR: ko.observable(["Mon intérêt pour les logiciels a commencé au milieu des années 80 lorsque j'ai reçu mon tout premier ordinateur - un Timex Sinclair 2068 avec ses incroyables 48Kb RAM et 24Kb ROM. J'ai rapidement commencé à modifier des fonctionnalités de jeu simples à l'aide de Basic.<br><br>\"Né à Porto, élevé à Luxembourg, mûri à Londres et installé à Bruxelles\" serait peut-être le slogan qui résume les expériences qui ont le plus marqué ma vie. Cela m'a inculqué un amour profondément enraciné pour les voyages, les langues et l'épanouissement en dehors de ma zone de confort."]),
		aboutLeftPages: ko.observable(["<div id='activeleft4'><img class='mypic' data-bind='attr: {src: aboutImg()}'><p class='abList' data-bind='html: english() ? aboutLeftPagesEN()[activePageNr()] : aboutLeftPagesFR()[activePageNr()]'></p></div>"]),
		aboutRightPages: ko.observable(["<div id='activeright4'><p class='abList' data-bind='html: english() ? aboutRightPagesEN()[activePageNr()] : aboutRightPagesFR()[activePageNr()]'></p></div>"]),

		activeAlertMessage: ko.observable(0),
		alertMessagesEN: ko.observable(["", "All fields are required", "Your email doesn't appear to be valid", "Your message has been sent. Thank you."]),
		alertMessagesFR: ko.observable(["", "Tous les champs sont requis", "Votre email ne semble pas valide", "Votre message a été envoyé. Merci."]),
		sandwichSymbol: ko.observable('≡'),
		closeSymbol: ko.observable('x'),
		menuSymbol: ko.observable(''),
		hiddenMenu: ko.observable(false),
		english: ko.observable(true),
		french: ko.observable(false),
		language: ko.observable("en"),
		dark: ko.observable(true),
		light: ko.observable(false),
		style: ko.observable("dark"),
		bigLeftFlip: function(newElement) {
			if (this.activePage() == "portfolio") {
				$(newElement).html(this.portfolioLeftPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeleft")[0]);
			} else if (this.activePage() == "education") {
				$(newElement).html(this.educationLeftPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeleft2")[0]);
			} else if (this.activePage() == "work") {
				$(newElement).html(this.workLeftPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeleft3")[0]);
			} else if (this.activePage() == "about") {
				$(newElement).html(this.aboutLeftPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeleft4")[0]);
			} else if (this.activePage() == "contact") {
				$(newElement).html("<div id='contactformleft' style='display: flex;flex-direction: column;height: 100%;padding-block: 0.5em;width: 80%;font-size: 0.8em;overflow-y: auto;'><label for='message' data-bind='text: english() ? text.yourMessageEN() : text.yourMessageFR()'></label><textarea class='formfield' data-bind='css: { lightformfield: light() }' id='message' name='message' value='' autocomplete='off' style='min-height: 10em;' required></textarea></div>");
				ko.applyBindings(viewModel, $("#contactformleft")[0]);
			}
		},
		bigRightFlip: function(newElement) {
			if (this.activePage() == "portfolio") {
				$(newElement).html(this.portfolioRightPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeright")[0]);
			} else if (this.activePage() == "education") {
				$(newElement).html(this.educationRightPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeright2")[0]);
			} else if (this.activePage() == "work") {
				$(newElement).html(this.workRightPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeright3")[0]);
			} else if (this.activePage() == "about") {
				$(newElement).html(this.aboutRightPages()[this.activePageNr()]);
				ko.applyBindings(viewModel, $("#activeright4")[0]);
			} else if (this.activePage() == "contact") {
				$(newElement).html("<div id='contactformright' style='display: flex;flex-direction: column;height: 100%;padding-block: 0.5em;width: 80%;font-size: 0.8em;overflow-y: auto;'><label for='name' data-bind='text: english() ? text.yourNameEN() : text.yourNameFR()'></label><input class='formfield' data-bind='css: { lightformfield: light() }' id='name' name='name' value='' autocomplete='off' type='text' required><label for='email' data-bind='text: english() ? text.yourEmailEN() : text.yourEmailFR()'></label><input class='formfield' data-bind='css: { lightformfield: light() }' id='email' name='email' value='' autocomplete='off' type='email' pattern='/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/' required><input class='formbutton' data-bind='css: { lightformbutton: light() }, value: english() ? text.sendEN() : text.sendFR()' id='send' type='button' onclick='sendMessage();'><div id='alert_message'><p data-bind='text: english() ? viewModel.alertMessagesEN()[viewModel.activeAlertMessage()] : viewModel.alertMessagesFR()[viewModel.activeAlertMessage()]'></p></div></div>");
				ko.applyBindings(viewModel, $("#contactformright")[0]);
			}
		},
		longLeftFlip: function(newElement) {
			if (this.activePage() == "portfolio") {
				$(newElement).html(this.longLeftPage());
				ko.applyBindings(viewModel, $("#long_cell_left")[0]);
			} else if (this.activePage() == "education") {
				$(newElement).html("<h2 id='ed' style='color: darkgray;font-weight: bold;' data-bind='text: english() ? text.trainEdEN() : text.trainEdFR()'></h2>");
				ko.applyBindings(viewModel, $("#ed")[0]);
			} else if (this.activePage() == "work") {
				$(newElement).html("<h2 id='workexp' style='color: darkgray;font-weight: bold;' data-bind='text: english() ? text.workExpEN() : text.workExpFR()'></h2>");
				ko.applyBindings(viewModel, $("#workexp")[0]);
			} else if (this.activePage() == "about") {
				$(newElement).html("<h2 id='ab' style='color: darkgray;font-weight: bold;' data-bind='text: english() ? text.abEN() : text.abFR()'></h2>");
				ko.applyBindings(viewModel, $("#ab")[0]);
			} else if (this.activePage() == "contact") {
				$(newElement).html("<h2 id='ab' style='color: darkgray;font-weight: bold;' data-bind='text: english() ? \"Send me a message\" : \"Envoyez-moi un message\"'></h2>");
				ko.applyBindings(viewModel, $("#ab")[0]);
			}
		},
		longRightFlip: function(newElement) {
			if (this.activePage() == "portfolio") {
				$(newElement).html(this.longRightPage());
				ko.applyBindings(viewModel, $("#long_cell_right")[0]);
			} else if (this.activePage() == "education") {
				$(newElement).html("<div id='downloadCv1' style='display: flex;align-self: center;'><a class='dnlCv' target='_blank' data-bind=\"attr: { href: english() ? 'docs/CV-En.pdf' : 'docs/CV-Fr.pdf' }, text: english() ? 'Download my CV' : 'Téléchargez mon CV'\"></a></div>");
				ko.applyBindings(viewModel, $("#downloadCv1")[0]);
			} else if (this.activePage() == "work") {
				$(newElement).html("<div id='downloadCv2' style='display: flex;align-self: center;'><a class='dnlCv' target='_blank' data-bind=\"attr: { href: english() ? 'docs/CV-En.pdf' : 'docs/CV-Fr.pdf' }, text: english() ? 'Download my CV' : 'Téléchargez mon CV'\"></a></div>");
				ko.applyBindings(viewModel, $("#downloadCv2")[0]);
			} else if (this.activePage() == "about") {
				$(newElement).html("<div id='downloadCv3' style='display: flex;align-self: center;'><a class='dnlCv' target='_blank' data-bind=\"attr: { href: english() ? 'docs/CV-En.pdf' : 'docs/CV-Fr.pdf' }, text: english() ? 'Download my CV' : 'Téléchargez mon CV'\"></a></div>");
				ko.applyBindings(viewModel, $("#downloadCv3")[0]);
			} else if (this.activePage() == "contact") {
				$(newElement).html("<div id='downloadCv4' style='display: flex;align-self: center;'><a class='dnlCv' target='_blank' data-bind=\"attr: { href: english() ? 'docs/CV-En.pdf' : 'docs/CV-Fr.pdf' }, text: english() ? 'Download my CV' : 'Téléchargez mon CV'\"></a></div>");
				ko.applyBindings(viewModel, $("#downloadCv4")[0]);
			}
		},
		flipDiv: function(id, group) {
			self = this;
			var element = document.getElementById(id);
			if (group == "upper-top-row") {
				$(element).toggleClass("card-flipped-hor");
			} else if (group == "lower-top-row") {
				$(element).toggleClass("card-flipped-ver");
			} else if (group == "bottom-row-left") {
				$(element).toggleClass("card-flipped-hor-reverse");
			} else if (group == "bottom-row-right") {
				$(element).toggleClass("card-flipped-hor");
			}	
		},
		flipUpperTopDivs: function() {
			self = this;
			var element = "";
			for (a = 1; a <= 11; a++) {
				(function(ind) {
					setTimeout(function(){
						element = "flip" + ind;
						self.flipDiv(element, "upper-top-row");
					}, 25 * (ind - 1));
				})(a);

				(function(ind) {
					setTimeout(function(){
						element = "flip" + ind;
						self.flipDiv(element, "upper-top-row");
					},  25 * (ind - 1) + 400);
				})(a);
			}
		},
		closeHiddenMenu: function() {
			self = this;
			$(".menu-cell").css("left","-100vw");
			self.menuSymbol(self.sandwichSymbol());
			self.hiddenMenu(false);
		},
		toggleHiddenMenu: function() {
			self = this;
			if ($(".menu-cell").css("left") == "0px") {
				$(".menu-cell").css("left","-100vw");
				self.menuSymbol(self.sandwichSymbol());
			} else {
				$(".menu-cell").css("left","0vw");
				self.menuSymbol(self.closeSymbol());
			}
			self.hiddenMenu(!self.hiddenMenu());
		},
		englishLanguage: function() {
			self = this;
			if (!self.english()) {
				if (self.orientation() == "landscape") {
					self.flipUpperTopDivs();
				}
				setTimeout(function() {
					self.english(!self.english());
					self.french(!self.french());
					self.language("en");
				}, 350);
			}
		},
		frenchLanguage: function() {
			self = this;
			if (!self.french()) {
				if (self.orientation() == "landscape") {
					self.flipUpperTopDivs();
				}
				setTimeout(function() {
					self.english(!self.english());
					self.french(!self.french());
					self.language("fr");
				}, 350);
			}
		},
		lightStyle: function() {
			self = this;
			if (!self.light()) {

				self.light(!self.light());
				self.dark(!self.dark());
				self.style("light");
			}
		},
		darkStyle: function() {
			self = this;
			if (!self.dark()) {

				self.dark(!self.dark());
				self.light(!self.light());
				self.style("dark");
			}
		}
	};

	viewModel.portfolioImg = ko.computed(function() {
		if (isMobile) {
			return viewModel.portfolioSmallImgs()[viewModel.activePageNr()];
		} else {
			return viewModel.portfolioLargeImgs()[viewModel.activePageNr()];
		}
	}, viewModel);

	viewModel.aboutImg = ko.computed(function() {
		if (isMobile) {
			return viewModel.aboutSmallImgs()[viewModel.activePageNr()];
		} else {
			return viewModel.aboutLargeImgs()[viewModel.activePageNr()];
		}
	}, viewModel);

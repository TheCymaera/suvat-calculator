<?php
	$url = strtok("$_SERVER[REQUEST_SCHEME]://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]", "\?|#");

	// page basic settings
	$page_title 		= "Suvat Calculator";
	$page_description 	= "Suvat Calculator.";
	$page_author		= "Morgan";
	$page_keywords		= "Heledron, Hadron, Cymaera, suvat, physics, Newton, equations, of, motion";

	// page open graph settings
	$page_og_title = $page_title;
	$page_og_description = $page_description;
	$page_og_url = $url;
	$page_og_image = $url . "thumbnail.png";
	$page_og_type = "website";
?>
<!DOCTYPE html>
<html class="full-window-document">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

	<!-- title & favicon -->
	<title><?php echo $page_title;?></title>
    <link rel="icon" href="/favicon.png" type="image/png"/>
	
	<!-- info -->
    <meta name="author" content="<?php echo $page_author;?>"/>
    <meta name="description" content="<?php echo $page_description;?>"/>
    <meta name="keywords" content="<?php echo $page_keywords;?>"/>
	
	<!-- sharing -->
    <meta property="og:title" content="<?php echo $page_og_title;?>"/>
    <meta property="og:description" content="<?php echo $page_og_description;?>"/>
    <meta property="og:url"   content="<?php echo $page_og_url;?>"/>
    <meta property="og:image" content="<?php echo $page_og_image;?>"/>
    <meta property="og:type"  content="<?php echo $page_og_type;?>"/>

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="/shared/fontawesome-free-5.13.1-web/css/all.min.css"/>
	<link rel="stylesheet" type="text/css" href="/shared/helion/v1/index.css"/>
	<link rel="stylesheet" href="./dst/main.css" type="text/css" />

	<!-- scripts -->
	<script src="./dst/main.js" type="module"></script>
</head>
<body class="stack">
	<standard-view>
		<app-bar slot="header" center-title>
			<app-bar-left>
				<a class="app-bar-icon-button" href="/">
					<i class="fa fa-angle-left"></i>
				</a>
			</app-bar-left>
			<app-bar-title>Suvat Calculator</app-bar-title>
		</app-bar>
		<main slot="body" style="overflow: auto;">
			<br />
			<br />
			<suvat-app>
				<suvat-app-main>
					<section id="variablesSection">
						<div class="suvat-variable">
							<label>
								<span>S</span>
								<input id="inputS" type="number" step="any" placeholder="Displacement" />
							</label>
							<button id="clearS">Clear</button>
						</div>
						<div class="suvat-variable">
							<label>
								<span>U</span>
								<input id="inputU" type="number" step="any" placeholder="Initial velocity" />
							</label>
							<button id="clearU">Clear</button>
						</div>
						<div class="suvat-variable">
							<label>
								<span>V</span>
								<input id="inputV" type="number" step="any" placeholder="Final velocity" />
							</label>
							<button id="clearV">Clear</button>
						</div>
						<div class="suvat-variable">
							<label>
								<span>A</span>
								<input id="inputA" type="number" step="any" placeholder="Acceleration" />
							</label>
							<button id="clearA">Clear</button>
						</div>
						<div class="suvat-variable">
							<label>
								<span>T</span>
								<input id="inputT" type="number" step="any" placeholder="Time" />
							</label>
							<button id="clearT">Clear</button>
						</div>
					</section>
					
					<!-- Buttons -->
					<section id="buttonsSection">
						<button id="calculate">Calculate</button>
						<button id="clearAll">Reset</button>
					</section>

					<section id="outputSection">
						<output id="message"></output>
					</section>
				</suvat-app-main>

				<!-- Info section -->
				<suvat-app-info id="infoSection">
					<h2>Info</h2>
					<p>
						SUVAT is colloquial for the equations of motion.
					</p>
					
					<p>
						Enter 3 of the 5 values and hit <i>calculate</i> to find the other 2.<br>
						Known values are highlighted in green.
					</p>

					<p>
						Remember to enter your variables in SI units!
					</p>

					<h3>Code</h3>
					<a href="https://github.com/TheCymaera/suvat-js">SUVAT Library</a> <br />
					<a href="https://github.com/TheCymaera/suvat-calculator">Calculator</a>
				</suvat-app-info>

				<!-- Buffer -->
				<suvat-app-buffer></suvat-app-buffer>
			</suvat-app>

			<div style="flex: 1;"></div>
		</main>
	</standard-view>
</body>
</html>
<?php

$url = strtolower($_SERVER['REQUEST_URI']);
$url_ws = rtrim($url, '/');

// If to the main page, load index.html
if ($url === '' || $url === '/') {
    if (file_exists(__DIR__ . '/index.html')) {
        include __DIR__ . '/index.html';
        exit();
    }
} else {
    // Add a slash if there isn't one
	if ($url !== '/' && substr($url, -1) !== '/') {
		$url .= '/'; 
		header("Location: $url", true, 301);
		exit();
	}
}

// If html file not exists go to 404
if (!file_exists(__DIR__ . $url_ws . '.html')) {
    header("HTTP/1.0 404 Not Found");
    include __DIR__ . '/404.html';
    exit();
}

// Redirect if URL contains capital letters
if ($url !== $_SERVER['REQUEST_URI']) {
    header("Location: $url", true, 301);
    exit();
}

// Check if there is a corresponding .html file
if (file_exists(__DIR__ . $url_ws . '.html')) {
    include __DIR__ . $url_ws . '.html';
    exit();
}

// Check if the folder with index.php exists
if (is_dir(__DIR__ . $url_ws) && file_exists(__DIR__ . $url_ws . '/index.php')) {
    header("Location: $url", true, 301);
    exit();
}
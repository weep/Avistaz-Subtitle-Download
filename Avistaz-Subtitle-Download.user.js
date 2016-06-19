// ==UserScript==
// @name         Avistaz subtitle download
// @namespace    http://weep.se/
// @version      0.1
// @description  Adds the posibility to download subtitles from the flags in the list
// @downloadURL  https://raw.githubusercontent.com/weep/Avistaz-Subtitle-Download/master/Avistaz-Subtitle-Download.user.js
// @author       Weep
// @match        https://avistaz.to/*
// @grant        none
// ==/UserScript==
'use strict';

(function() {
	var flagclass = "";

	$(".flag-icon").off(); $(".flag-icon").click(function(target) {
		var parent = target.target.parentElement;

		flagclass = "i." + target.target.className.replace(/ /ig, ".");
		var linkNode = parent.getElementsByTagName("a")[0];
		var link = linkNode.href;

		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.open("GET", linkNode.href);
		oReq.send();
	});

	function reqListener() {
		var parser = new DOMParser()
		var el = parser.parseFromString(this.responseText, "text/html");
		var i = $(el).find(flagclass)[0];

		var tr = $($(i).closest("tr")[0]);
		var href = tr.find("a")[0].href;
		console.log(href);
		downloadURI(href);
	}

	function downloadURI(uri, name) {
		var link = document.createElement("a");
		link.download = name;
		link.href = uri;
		link.click();
	}
})();
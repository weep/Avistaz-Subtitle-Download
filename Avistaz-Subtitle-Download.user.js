// ==UserScript==
// @name         Avistaz subtitle download
// @namespace    http://weep.se/
// @version      0.3
// @description  Adds the posibility to download subtitles from the flags in the list
// @downloadURL  https://raw.githubusercontent.com/weep/Avistaz-Subtitle-Download/master/Avistaz-Subtitle-Download.user.js
// @author       Weep
// @match        https://avistaz.to/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
'use strict';

(function() {
	var flagclass = "i.flag-icon-gb";
	var item = $("[data-original-title=English]").closest(".badge-extra")
	item.off();

	item.click(function(target) {
		var link = $(event.target).closest(".torrent-file").find(".torrent-filename")[0];

		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.open("GET", link);
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
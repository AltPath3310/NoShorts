function injectCSS() {
	if (!document.getElementById("injected-css")) {
		const style = document.createElement("style");
		style.id = "injected-css";
		style.textContent = `
		.ytd-rich-shelf-renderer {
			display: none !important;
		}
		
		ytd-reel-shelf-renderer {
			display: none !important;
		}
		
		yt-horizontal-list-renderer[should-use-shorts-list-height] {
			display: none !important;
		}
		
		[chip-shape-data*='"text":"Shorts"'] {
			display: none !important;
		}
		
		.ytd-item-section-renderer[is-search] {
			display: none !important
		}

		[title="Shorts"] {
			display: none !important;
		}

		[tab-title="Shorts"] {
			display: none !important;
		}
	  `;
		document.head.appendChild(style);
	}
}

function removeCSS() {
	const style = document.getElementById("injected-css");
	if (style) style.remove();
}

async function handleHideShortsToggle(checked, callback) {
	if (checked) {
		injectCSS();
	} else if (callback) {
		callback();
	} else {
		removeCSS();
	}
}

handleHideShortsToggle(null, async () => {
	const { hideShorts } = await browser.storage.local.get("hideShorts");
	handleHideShortsToggle(hideShorts);
});

browser.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === "local" && changes.hideShorts) {
		const hideShorts = changes.hideShorts.newValue;
		handleHideShortsToggle(hideShorts);
	}
});

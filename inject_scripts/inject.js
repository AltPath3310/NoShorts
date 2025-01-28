async function handleHideShortsToggle(checked, callback) {
	if (checked) {
		window.location.replace("https://www.youtube.com/");
	} else {
		callback();
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

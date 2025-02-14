document.addEventListener("DOMContentLoaded", async () => {
	const hideShortsToggle = document.getElementById("hide-shorts-toggle");

	const { hideShorts } = await browser.storage.local.get("hideShorts");
	hideShortsToggle.checked = hideShorts || false;

	hideShortsToggle.addEventListener("change", async (e) => {
		await browser.storage.local.set({
			hideShorts: e.target.checked,
		});
	});
});

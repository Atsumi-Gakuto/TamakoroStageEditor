/**
 * ページの初期処理
 */
function init() {
	//パレットの描画
	const paletteContext = document.getElementById("palette_canvas").getContext("2d");
	paletteContext.strokeStyle = "lightgray";
	paletteContext.lineWidth = 2;
	paletteContext.strokeRect(0, 0, 162, 22);
	const iconLoadPromises = [];
	for(let i = 0; i < 8; i++) iconLoadPromises.push(new Promise((resolve) => {
		const tileIcon = document.createElement("img");
		tileIcon.src = `tiles/${i}.svg`;
		tileIcon.addEventListener("load", () => {
			paletteContext.drawImage(tileIcon, i * 20 + 1, 1);
			resolve();
		}, {once: true});
	}));
	Promise.all(iconLoadPromises).then(() => {
		for(let i = 0; i < 7; i++) paletteContext.strokeRect(i * 20 + 1, 1, 20, 20);
	});
}
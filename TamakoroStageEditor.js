/**
 * タイルの画像を保持する配列
 * @type {HTMLImageElement[]}
 */
const TileImages = [];

/**
 * 現在選択中のタイル
 * @type {number}
 */
let CurrentTile = 0;

//初期処理
window.addEventListener("load", () => {
	//ステージの描画
	const stageCanvasContext = document.getElementById("stage_canvas").getContext("2d");
	for(let y = 0; y < 25; y++) {
		for(let x = 0; x < 19; x++) stageCanvasContext.drawImage(TileImages[0], x * 20, y * 20);
	}
	//パレットの描画
	const paletteContext = document.getElementById("palette_canvas").getContext("2d");
	paletteContext.strokeStyle = "lightgray";
	paletteContext.lineWidth = 1;
	paletteContext.strokeRect(0, 0, 162, 22);
	for(let i = 0; i < 8; i++) {
		paletteContext.drawImage(TileImages[i], i * 20 + 1, 1);
		switch(i) {
			case 0:
				paletteContext.strokeStyle = "orange";
				break;
			case 1:
				paletteContext.strokeStyle = "lightgray";
				break;
		}
		paletteContext.strokeRect(i * 20 + 1, 1, 20, 20);
	}

	//パレットをクリックした時のイベント
	document.getElementById("palette_canvas").addEventListener("click", (event) => {
		const clickPosX = event.clientX - event.target.getBoundingClientRect().left;
		paletteContext.strokeStyle = "lightgray";
		paletteContext.strokeRect(CurrentTile * 20 + 1, 1, 20, 20);
		CurrentTile = Math.min(Math.max(Math.floor((clickPosX - 1) / 20), 0), 7);
		paletteContext.strokeStyle = "orange";
		paletteContext.strokeRect(CurrentTile * 20 + 1, 1, 20, 20);
	});
});

//タイル画像の読み込み
for(let i = 0; i < 8; i++) {
	const tileIcon = document.createElement("img");
	tileIcon.src = `tiles/${i}.svg`;
	TileImages.push(tileIcon);
}
/**
 * タイルの画像を保持する配列
 * @type {HTMLImageElement[]}
 */
const TileImages = [];

/**
 * ページの初期処理
 */
function init() {
	//ステージキャンバスの描画
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
		paletteContext.strokeRect(i * 20 + 1, 1, 20, 20);
	}
}

//タイル画像の読み込み
for(let i = 0; i < 8; i++) {
	const tileIcon = document.createElement("img");
	tileIcon.src = `tiles/${i}.svg`;
	TileImages.push(tileIcon);
}
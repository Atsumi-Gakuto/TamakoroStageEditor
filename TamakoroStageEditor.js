/**
 * タイルの画像要素の配列
 * @type {HTMLImageElement[]}
 */
const TileImages = [];

/**
 * タイルの情報の配列
 * @type {{name: string, desc: string}[]}
 */
const TileInformation = [
	{
		name: "床",
		desc: "ボールが通行可能な床。"
	},
	{
		name: "壁",
		desc: "ボールが通行不可能な壁。"
	},
	{
		name: "ゴール",
		desc: "ボールがこれに触れるとゴールとなりステージクリア。"
	},
	{
		name: "穴",
		desc: "ボールの中心がここを通るとミスになる。"
	},
	{
		name: "ベルトコンベア（上）",
		desc: "ボールの中心がここを通るとボールが上に流れてしまう。"
	},
	{
		name: "ベルトコンベア（右）",
		desc: "ボールの中心がここを通るとボールが右に流れてしまう。"
	},
	{
		name: "ベルトコンベア（下）",
		desc: "ボールの中心がここを通るとボールが下に流れてしまう。"
	},
	{
		name: "ベルトコンベア（左）",
		desc: "ボールの中心がここを通るとボールが左に流れてしまう。"
	}
];

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
		document.querySelector("#main_area > h3").innerText = TileInformation[CurrentTile].name;
		document.querySelector("#main_area > p").innerText = TileInformation[CurrentTile].desc;
	});
});

//タイル画像の読み込み
for(let i = 0; i < 8; i++) {
	const tileIcon = document.createElement("img");
	tileIcon.src = `tiles/${i}.svg`;
	TileImages.push(tileIcon);
}
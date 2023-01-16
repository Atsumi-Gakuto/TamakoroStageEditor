/**
 * 	ステージのキャンバスのコンテキスト
 * @type {CanvasRenderingContext2D|undefined}
 */
let StageCanvasContext = undefined;

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
 * ステージを表現する配列
 * @type {number[][]}
 */
const StageData = Array.from({length: 25}, () => Array(19).fill(0));

/**
 * ボールの初期位置
 * @type {number[2]}
 */
let BallPos = [0, 0];

/**
 * 現在選択中のタイル
 * @type {number}
 */
let CurrentTile = 0;

/**
 * マウスボタンが押されているかどうか
 * @type {boolean}
 */
let IsMouseDown = false;

/**
 * ステージ全体を描画する
 */
function drawStage() {
	for(let y = 0; y < 25; y++) {
		for(let x = 0; x < 19; x++) StageCanvasContext.drawImage(TileImages[StageData[y][x]], x * 20, y * 20);
	}
}

//初期処理
window.addEventListener("load", () => {
	//ステージの描画
	const stageCanvas = document.getElementById("stage_canvas");
	StageCanvasContext = document.getElementById("stage_canvas").getContext("2d");

	//パレットの描画
	const paletteCanvas = document.getElementById("palette_canvas");
	const paletteCanvasContext = paletteCanvas.getContext("2d");
	paletteCanvasContext.strokeStyle = "lightgray";
	paletteCanvasContext.lineWidth = 1;
	paletteCanvasContext.strokeRect(0, 0, 162, 22);
	for(let i = 0; i < 8; i++) {
		paletteCanvasContext.drawImage(TileImages[i], i * 20 + 1, 1);
		switch(i) {
			case 0:
				paletteCanvasContext.strokeStyle = "orange";
				break;
			case 1:
				paletteCanvasContext.strokeStyle = "lightgray";
				break;
		}
		paletteCanvasContext.strokeRect(i * 20 + 1, 1, 20, 20);
	}

	//ステージ内でカーソルが動いた時のイベント
	/**
	 * タイルを塗り替える処理
	 * @param {MouseEvent} event
	 */
	function clickTile(event) {
		const boundingRect = event.target.getBoundingClientRect();
		const mousePos = [Math.floor((event.clientX - boundingRect.left) / 20), Math.floor((event.clientY - boundingRect.top) / 20)];
		if(StageData[mousePos[1]][mousePos[0]] != CurrentTile) {
			StageData[mousePos[1]][mousePos[0]] = CurrentTile;
			StageCanvasContext.drawImage(TileImages[CurrentTile], mousePos[0] * 20, mousePos[1] * 20);
		}
	}

	stageCanvas.addEventListener("click", (event) => clickTile(event));
	stageCanvas.addEventListener("mousemove", (event) => {
		if(IsMouseDown) clickTile(event);
	});

	//パレットをクリックした時のイベント
	paletteCanvas.addEventListener("click", (event) => {
		const clickPosX = event.clientX - event.target.getBoundingClientRect().left;
		paletteCanvasContext.strokeStyle = "lightgray";
		paletteCanvasContext.strokeRect(CurrentTile * 20 + 1, 1, 20, 20);
		CurrentTile = Math.min(Math.max(Math.floor((clickPosX - 1) / 20), 0), 7);
		paletteCanvasContext.strokeStyle = "orange";
		paletteCanvasContext.strokeRect(CurrentTile * 20 + 1, 1, 20, 20);
		document.querySelector("#main_area > h3").innerText = TileInformation[CurrentTile].name;
		document.querySelector("#main_area > p").innerText = TileInformation[CurrentTile].desc;
	});

	//ステージ内で右クリックした時のイベント
	stageCanvas.addEventListener("contextmenu", (event) => {
		event.preventDefault();
		const boundingRect = event.target.getBoundingClientRect();
		BallPos = [Math.floor((event.clientX - boundingRect.left) / 20), Math.floor((event.clientY - boundingRect.top) / 20)];
		const ballElement = document.getElementById("ball");
		ballElement.style.marginLeft = `${BallPos[0] * 20}px`;
		ballElement.style.marginTop = `${BallPos[1] * 20}px`;
	});

	//保存ボタン
	document.getElementById("save_button").addEventListener("click", () => {
		const blob = new Blob([JSON.stringify({stage: StageData, startPos: BallPos})], {type: "application/json"});
		const downloadLink = document.createElement("a");
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = "stage.json";
		downloadLink.click()
	});
}, {once: true});

window.addEventListener("mousedown", (event) => {
	if(event.button == 0) IsMouseDown = true;
});
window.addEventListener("mouseup", (event) => {
	if(event.button == 0) IsMouseDown = false;
});

//タイル画像の読み込み
for(let i = 0; i < 8; i++) {
	const tileIcon = document.createElement("img");
	tileIcon.src = `tiles/${i}.svg`;
	TileImages.push(tileIcon);
}
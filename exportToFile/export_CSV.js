const exp_csv = require('json2csv')

let data = [{
    id:"id nr",
    name: "myname",
    email: "dfs@dgs"
}]


/*

<body>
	<button type="button" id="btnDownloadCsv">Download CSV</button>

	<script src="https://cdn.jsdelivr.net/npm/json2csv"></script>
	<script>
		const data = [
			{
				id: "de86e2",
				username: "dcode",
				age: 36
			},
			{
				id: "aa11b4",
				username: "code.slayer1",
				age: 24
			},
			{
				id: "be45dd",
				username: "javascriptking",
				age: 42
			}
		];

		const btnDownloadCsv = document.getElementById("btnDownloadCsv");

		btnDownloadCsv.addEventListener("click", () => {
			downloadCsv("dcode-test.csv", json2csv.parse(data));
		});

		function downloadCsv(filename, csvData) {
			const element = document.createElement("a");

			element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
			element.setAttribute("download", filename);
			element.style.display = "none";

			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		}
	</script>
</body>
*/
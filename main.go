package main

import (
	"io"
	"os"

	"github.com/go-echarts/go-echarts/v2/components"

	"UniversalProduct/roc"
)

func main() {
	page := components.NewPage()
	page.AddCharts(
		roc.LineSmooth(),
	)
	f, err := os.Create("line.html")
	if err != nil {
		panic(err)
	}
	page.Render(io.MultiWriter(f))
}
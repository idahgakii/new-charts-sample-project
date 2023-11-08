import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UIChart } from 'primeng/chart';
import { DocumentType} from "./DocumentType";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import {USERS} from "../../Users";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @ViewChild('chart') el: ElementRef;
  @ViewChild('chart') chart: UIChart;
  title = 'new-charts-sample-project';
  basicData: any;
  basicOptions: any;
  documentSelection: string = DocumentType.PDF;
  users = USERS;

  constructor(
  ) { }

  ngOnInit() {
    this.basicData = {
      labels: ['January', 'February', 'March',
        'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '2020',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#AA2324',
          tension: 0.4,
        },
        {
          label: '2021',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#177300',
          tension: 0.4,
        },
      ],
    };
    this.basicOptions = {
      title: {
        display: true,
        text: 'Article Views',
        fontSize: 32,
        position: 'top',
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return theBlob as File;
  }

  generateDocFromChart() {

    console.log('generateDocFromChart: documentType', this.documentSelection);
    switch (this.documentSelection) {
      case DocumentType.PDF:
        this.generatePDF2();
        break;
      case DocumentType.IMAGE:
        this.screenshot();
        break;
      case DocumentType.CSV:
        this.exportChartAsCSV();
        break;
      case DocumentType.XLSX:
        this.exportChartAsXLSX();
        break;
      case DocumentType.JSON:
        this.exportChartAsJSON();
        break;
      case DocumentType.HTML:
        this.exportChartAsHTML();
        break;
      default:
        break;
    }

    // this.chartExporter.exportChart(this.documentType, this.chart);
    // console.log('generateDocFromChart: documentType', this.documentSelection);
    // var a = document.createElement('a');
    // a.href = this.chart.getBase64Image();
    // a.download = 'my_file_name.png';
    // a.click();

    // this.chart.getBase64Image().then((data) => {
    //   this.chartExporter.exportChart(this.documentType, this.chart, data);
    // };
  }
  private exportChartAsJSON() {

  }

  private exportChartAsXLSX() {

  }

  private exportChartAsHTML() {

  }

  private exportChartAsCSV() {

  }

  /**
   * Converts a base64 string to a blob
   * @param base64String base64 string
   * @returns {Blob} generated blob
   */
  blobFromBase64String(base64String: string, type: string) {
    const byteArray = Uint8Array.from(
      atob(base64String)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );
    return new Blob([byteArray], { type: type });
  }

  generateDocuments() {
    this.generateDocFromChart();
  }

  screenshot() {
    // Call the html2canvas function and pass the element as an argument
    html2canvas(this.chartContainer.nativeElement).then((canvas) => {
      // Get the image data as a base64-encoded string
      canvas.title = 'Sample';
      const imageData = canvas.toDataURL("image/png");

      // Do something with the image data, such as saving it as a file or sending it to a server
      // For example, you can create an anchor element and trigger a download action
      // const link = document.createElement("a");
      // link.setAttribute("download", "screenshot.png");
      // link.setAttribute("href", imageData);

      var a = document.createElement('a');
      a.href = imageData;
      a.download = 'my_file_name.png';
      a.click();
    });
  }

  generatePDF2(){
    html2canvas(this.chartContainer.nativeElement).then((canvas) => {
      const img = canvas.toDataURL("image/PNG",1.0);
      const doc = new jsPDF('l', 'mm', 'a4', true);
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(img, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);

      const base64fullString  = doc.output();
      const base64pdf = btoa(doc.output());

      console.log('base64fullString: ', base64fullString);
      console.log('base64pdf: ', base64pdf);
      //
      // // Get the file as Blob and convert to File
      // const blob = new Blob([doc.output('blob')], {type: 'application/pdf'});
      //
      // const file = this.blobToFile(blob, 'test.pdf');
      // console.log('file name: ', file.name);
      // console.log('file size: ', file.size);
      // console.log('file type: ', file.type);


      // // Download the PDF
      // const finalDoc = doc.save('test.pdf');

    });
  }

  protected readonly USERS = USERS;
}

import { Component } from '@angular/core';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chartdashboard';
  summaryItems = [
    { title: 'Cycle Witnessed', value: 800, icon: 'fa-solid fa-city' },
    { title: 'Cycle Matched', value: 720, icon: 'fa-solid fa-city' },
    { title: 'Planned', value: 800, icon: 'fa-solid fa-city' },
    { title: 'Total Transfer', value: 650, icon: 'fa-solid fa-city' }
  ];

  selectedTab: string = 'day';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }




  public matchedChartData: any;
  public mismatchedChartData: any;
  public semenCollectionChartData: any;
  public semenCollectionData: any = {
    checkedIn: {
      new: 0,
      followUp: 0
    },
    scheduled: {
      new: 0,
      followUp: 0
    }
  };
  public chartOptions: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      // Matched Chart Data
      this.matchedChartData = {
        labels: ['Matched', 'Remaining'],
        datasets: [{
          data: [data.witnessReport.matched, 100 - data.witnessReport.matched],
          backgroundColor: ['#90E495', '#D3D3D3']
        }]
      };

      // Mismatched Chart Data
      this.mismatchedChartData = {
        labels: ['Mismatched', 'Remaining'],
        datasets: [{
          data: [data.witnessReport.mismatched, 100 - data.witnessReport.mismatched],
          backgroundColor: ['#F25B5B', '#D3D3D3']
        }]
      };

      this.semenCollectionData = data.semenCollection;

      // Semen Collection Chart Data
      this.semenCollectionChartData = {
        labels: ['Checked-In New', 'Checked-In Follow Up', 'Scheduled New', 'Scheduled Follow Up'],
        datasets: [{
          data: [
            data.semenCollection.checkedIn.new,
            data.semenCollection.checkedIn.followUp,
            data.semenCollection.scheduled.new,
            data.semenCollection.scheduled.followUp
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      };

      // Chart Options
      this.chartOptions = {
        plugins: {
          legend: {
            display: true,
            labels: {
              fontColor: '#000'
            }
          }
        }
      };


    });


    // Plugin to add percentage in the center of the doughnut chart
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      const text = chart.config.data.datasets[0].data[0] + "%";
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }

  }

}

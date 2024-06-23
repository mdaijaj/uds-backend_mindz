import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-return-later',
  templateUrl: './return-later.component.html',
  styleUrls: ['./return-later.component.scss']
})
export class ReturnLaterComponent {
  getPDFdata: boolean;
  singleData: any;
  id: any;
 
  constructor(private adminService: AdminSupportService,private activeroute: ActivatedRoute){
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.id;
    });
    this.adminService.getApproveById(this.id).subscribe((res: any) => {
      this.singleData = res.data;
    })
  }
 

  toPdf() {
    // window.location.reload();
    this.getPDFdata=true
    const dashboard = document.getElementById('page');
    const dashboardHeight = dashboard!.clientHeight;
    const dashboardWidth = dashboard!.clientWidth+3;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };
    domtoimage.toPng(dashboard!, options).then((imgData:any) => {
      console.log(dashboard,"imgData");
      
         const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
         const imgProps = doc.getImageProperties(imgData);
         const pdfWidth = doc.internal.pageSize.getWidth();
         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
         window.open(URL.createObjectURL(doc.output("blob")));
    });
}
}

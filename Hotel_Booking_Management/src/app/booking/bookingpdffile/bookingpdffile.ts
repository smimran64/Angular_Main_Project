import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookingservice } from '../../service/bookingservice';
import { BookingModel } from '../../model/Booking.model';

declare var html2pdf: any;

@Component({
  selector: 'app-bookingpdffile',
  standalone: false,
  templateUrl: './bookingpdffile.html',
  styleUrls: ['./bookingpdffile.css']
})
export class Bookingpdffile implements OnInit {

  booking: BookingModel = new BookingModel();
  bookingid: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: Bookingservice
  ) { }

  ngOnInit(): void {
    this.bookingid = this.route.snapshot.params['id'];

    if (this.bookingid) {
      this.bookingService.getByBookingId(this.bookingid).subscribe({
        next: (data: BookingModel) => {
          this.booking = data;
          console.log('Loaded Booking Data:',data);
        },
        error: (err) => {
          console.error('Booking load error:', err);
        }
      });
    }
  }

  printbookingform(): void {
    const element = document.getElementById('statementTable');
    const opt = {
      margin: 0.5,
      filename: `booking-statement-${this.bookingid}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (element) {
      html2pdf().set(opt).from(element).save();
    } else {
      alert('Nothing to print');
    }
  }

}

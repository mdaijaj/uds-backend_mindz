import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private toast: ToastrService) { }

    checkGSTNumber(value: any) {
        if (value) {
          const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
          return pattern.test(value);
        }
    }

    checkForValidFile(event: any, isPdf = false, isBoth = true) {
        let isValidExtension = true;
        if (!event.currentTarget.files || event.currentTarget.files.length == 0) {
            return isValidExtension;
        }
        let file = event.currentTarget.files[0];
        var filePath = file.name;

        let allowedFileSize = 500;
        let sizeLbl = "500 KB";
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (isPdf) {
            allowedFileSize = 5000;
            sizeLbl = "3 MB";
            allowedExtensions = /(\.pdf)$/i;
        }
        if (isBoth) {
            allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
            allowedFileSize = 5000;
            sizeLbl = "3 MB";
        }

        if (!allowedExtensions.exec(filePath)) {
            isValidExtension = false;
        }

        var fileSize = file.size / 1024;
        if (fileSize > allowedFileSize) {
            this.toast.error(`File cannot be greater than ${sizeLbl}`);
        }

        if (!isValidExtension) {
            this.toast.error('Please select valid file');
            $(event.currentTarget).val("");
        }
        return isValidExtension;
    }

}

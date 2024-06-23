import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourseAssignment'
})
export class FilterCourseAssignmentPipe implements PipeTransform {

  transform(value: any, searchVal: any) {
    let inputVal = searchVal.trim().toLowerCase()
    return value?.filter(function(search:any){
      return search.author_name.toLowerCase().indexOf(inputVal) > -1
    })
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: User[], filterText: string): User[] {
    return filterText ? value.filter((u: User) => u.name.indexOf(filterText) !== -1) : value;
  }

}

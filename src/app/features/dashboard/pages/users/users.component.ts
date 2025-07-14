import { Component, inject } from '@angular/core';

import { UsersService } from '@core/services/users.service';
import { TitleComponent } from '@shared/index';
import { RouterModule } from '@angular/router';

@Component({
    imports: [TitleComponent, RouterModule],
    templateUrl: './users.component.html',
    styles: ``
})
export default class UsersComponent {
  public usersService = inject(UsersService);

}

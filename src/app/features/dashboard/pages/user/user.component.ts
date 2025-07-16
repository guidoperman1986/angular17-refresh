import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';

import { UsersService } from '../../../../core/services/users.service';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../../../types/req-res.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
    imports: [TitleComponent, RouterModule],
    templateUrl: './user.component.html',
    styles: ``
})
export default class UserComponent implements OnInit {
  public usersService = inject(UsersService);
  route = inject(ActivatedRoute);
  @Input('id') id!: string;

  userName = computed(() => this.user() ? `${this.user()?.first_name} ${this.user()?.last_name}` : 'Cargando informacion' )

  //public user = signal<(User|undefined)>(undefined)
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )

    //this.usersService.getUserById(this.id)
  );

  ngOnInit(): void {
  }

  
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    currentUser: User;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((user: User) => this.currentUser = user);
    }
}

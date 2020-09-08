import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '@app/modules/images/interfaces/image';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor() { }

    getImages(): Observable<Image[]> {
        return of([
            {
                name: 'Ubuntu',
                tag: '18.04',
                imageUrl: 'https://d1q6f0aelx0por.cloudfront.net/product-logos/library-ubuntu-logo.png'
            },
            {
                name: 'Alpine',
                tag: '3.12.0',
                imageUrl: 'https://d1q6f0aelx0por.cloudfront.net/product-logos/library-alpine-logo.png'
            },
            {
                name: 'Arch Linux',
                tag: 'latest',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1024px-Archlinux-icon-crystal-64.svg.png'
            },
            {
                name: 'Debian',
                tag: 'bullseye',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Openlogo-debianV2.svg/827px-Openlogo-debianV2.svg.png'
            }
        ]);
    }
}

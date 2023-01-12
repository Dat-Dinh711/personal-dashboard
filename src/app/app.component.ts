import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),

        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-50px)',
                })
              ),
            ],
            {
              optional: true,
            }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(50px)',
                opacity: 0,
              }),
              animate(
                '250ms 150ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            {
              optional: true,
            }
          ),
        ]),
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),

        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(50px)',
                })
              ),
            ],
            {
              optional: true,
            }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(-50px)',
                opacity: 0,
              }),
              animate(
                '250ms 150ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            {
              optional: true,
            }
          ),
        ]),
      ]),
    ]),

    trigger('bgAnim', [
      transition(':leave', [animate(1000, style({ opacity: 0 }))]),
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 })),
      ]),

      transition(':leave', [animate(250, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent {
  backgrounds: string[] = [
    'https://images.unsplash.com/photo-1670837301464-514615f7b6f3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MjIxMTE4Ng&ixlib=rb-4.0.3&q=80&w=1920',
  ];

  loadingBGImage: boolean = false;

  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated) {
      return undefined;
    }
    return outlet.activatedRouteData['tab'];
  }

  async changeBGImage(): Promise<any> {
    this.loadingBGImage = true;

    const result = await fetch('http://source.unsplash.com/random/1920x1080', {
      method: 'HEAD',
    });

    const alreadyGot = this.backgrounds.includes(result.url);
    if (alreadyGot) {
      // This is the same image as we currently have, so re-run the function
      return this.changeBGImage();
    }

    this.backgrounds.push(result.url);
  }

  onBGImageLoad(imgEvent: Event) {
    // BG Image has loaded, now remove the old BG Image from the backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement;
    const src = imgElement.src;
    this.backgrounds = this.backgrounds.filter((bg) => bg === src);

    this.loadingBGImage = false;
  }
}

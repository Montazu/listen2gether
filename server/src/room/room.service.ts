import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

const playlist = [
  { id: 1, url: 'https://www.youtube.com/watch?v=gb5Q9N_0VBY' },
  { id: 2, url: 'https://www.youtube.com/watch?v=gb5Q9N_0VBY' },
];

@Injectable()
export class RoomService {
  constructor(private httpService: HttpService) {}

  getPlaylist() {
    return playlist;
  }

  addMusic(url: string) {
    const id = Math.round(Math.random() * 1000);
    const musicUrlId =
      new URL(url).searchParams.get('v') ||
      new URL(url).pathname.replace('/', '');

    // const result = await fetch(
    //   `https://x2convert.video/ajax2/getFile.ashx?linkinfo=https://youtu.be/${musicUrlId}`,
    // );

    // console.log(musicUrlId);

    // const newMusic = { id, url };
    // playlist.push(newMusic);

    // const result = this.httpService.get(
    //   ,
    // );

    // console.log(result);

    return this.httpService
      .get(
        `https://x2convert.video/ajax2/getFile.ashx?linkinfo=https://youtu.be/${musicUrlId}`,
      )
      .pipe(map((res) => res.data));
  }
}

// https://img.youtube.com/vi/DW9xp01kFoM/sd1.jpg

// https://c4.iiiijjjjij.com/xbase/eusf40.iiiijjjjij.com/xcfiles//files/2021/1/5/folk_lady_wi_a_wianki_cover_133059753469497394.mp3
// https://x2convert.video/ajax2/getFile.ashx?linkinfo=https://www.youtube.com/watch?v=MYYP7O4ts50&lang=en&option=100&country=undefined

import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { AddMusicDto } from './dtos/add-music.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getAll() {
    return this.roomService.getPlaylist();
  }

  @Post()
  add(@Body() body: AddMusicDto) {
    return this.roomService.addMusic(body.url);
  }
}

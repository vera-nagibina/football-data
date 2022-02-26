import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string) {
    let statuses = {
     SCHEDULED: 'Запланирован',
     LIVE: 'В прямом эфире',
     IN_PLAY: 'В игре',
     PAUSED: 'Пауза',
     FINISHED: 'Завершен',
     POSTPONED: 'Отложен',
     SUSPENDED: 'Приостановлен',
     CANCELED: 'Отменен'
    };
    return statuses[value as keyof typeof statuses]
  }
}
